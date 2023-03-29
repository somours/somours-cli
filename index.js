#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })
const prompts = require('prompts')
const {
	yellow,
	green,
	cyan,
	blue,
	magenta,
	lightRed,
	red,
	reset
} = require('kolorist')
const { fileIsEmpty, copy, emptyDir} = require('./lib/tools')
console.log(argv)

const cwd = process.cwd()

async function init () {
	let targetDir = argv._[0]
	// let template = argv.template || argv.t
	const defaultProjectName = targetDir || 'vue3-vite-ts'
	let result = {}
	try {
		result = await prompts([
			{
				type: targetDir ? null : 'text',
				name: 'projectName',
				initial: defaultProjectName,
				message: `What's your project name?`,
				onState: (state) =>
						(targetDir = state.value.trim() || defaultProjectName)
			},
			{
				type: () =>
						!fs.existsSync(targetDir) || fileIsEmpty(targetDir) ? null : 'confirm',
				name: 'overwrite',
				initial: true,
				message: () =>
						(targetDir === '.'
								? 'Current directory'
								: `Target directory "${targetDir}"`) +
						` is not empty. Remove existing files and continue?`
			},
			{
				type: (_, { overwrite } = {}) => {
					if (overwrite === false) {
						throw new Error(red('✖') + ' Operation cancelled')
					}
					return null
				},
				name: 'overwriteChecker'
			},
			// { // 验证package的名称
			// 	type: () => (isValidPackageName(targetDir) ? null : 'text'),
			// 	name: 'packageName',
			// 	message: reset('Package name:'),
			// 	initial: () => toValidPackageName(targetDir),
			// 	validate: (dir) =>
			// 			isValidPackageName(dir) || 'Invalid package.json name'
			// },
			{
				type: 'select',
				name: 'templateName',
				message: 'Pick a template',
				choices: [
					{ title: 'vue3 + vite', value: 'vue3-vite' },
					{ title: 'vue3 + vite + ts',value: 'vue3-vite-ts' },
					{ title: 'vue3 + webpack4  + ts', value: 'vue3-webpack-ts' },
					{ title: 'vue2 + webpack', value: 'vue2-webpack' }
				],
				initial: 1
			}
		], {
			onCancel: () => {
				throw new Error(red('✖') + ' Operation cancelled')
			}
		})
	} catch (cancelled) {
		console.log(cancelled.message)
	}

	console.log('result', result, targetDir)
	const  {projectName, overwrite, templateName} = result
	const root = path.join(process.cwd(), targetDir)
	const templateDir = path.join(__dirname, `/template/template-${templateName}`)

	console.log('templateDir', templateDir)


	if(overwrite) {
		emptyDir(root)
	} else if (!fs.existsSync(root)) {
		fs.mkdirSync(root)
	}
	const write = (file, content) => {
		const targetPath = path.join(root, file)
		if(content) {
			fs.writeFileSync(targetPath, content)
		} else {
			copy(path.join(templateDir, file), targetPath)
		}
	}
	const files = fs.readdirSync(templateDir)
	for (const file of files.filter(f => f !== 'node_module')) {
		write(file)
	}
	const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
	const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

	console.log(`\nDone. Now run:\n`)
	if (root !== cwd) {
		console.log(`  cd ${path.relative(cwd, root)}`)
	}
	switch (pkgManager) {
		case 'yarn':
			console.log('  yarn')
			console.log('  yarn dev')
			break
		default:
			console.log(`  ${pkgManager} install`)
			console.log(`  ${pkgManager} run dev`)
			break
	}
	console.log()
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
function pkgFromUserAgent(userAgent) {
	if (!userAgent) return undefined
	const pkgSpec = userAgent.split(' ')[0]
	const pkgSpecArr = pkgSpec.split('/')
	return {
		name: pkgSpecArr[0],
		version: pkgSpecArr[1]
	}
}

init()
