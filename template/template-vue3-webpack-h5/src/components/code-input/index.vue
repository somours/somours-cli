<template>
  <div class="input-box">
    <ul class="code-list">
      <li
        :class="[
          'code',
          isFocus && innerValue.length === idx ? 'cursor-blink' : '',
        ]"
        v-for="(i, idx) in codeArray"
        :key="idx"
      >
        {{ i }}
      </li>
    </ul>
    <input
      v-model="innerValue"
      class="code-input"
      type="text"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      @input="changeCode"
      @focus="isFocus = true"
      @blur="isFocus = false"
      inputMode="numeric"
      maxLength="6"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import { is } from "@/utils/is";
export default defineComponent({
  methods: { is },
  props: {
    value: {
      type: String,
      default: "",
    },
    length: {
      // code验证码的长度
      type: Number,
      default: 6,
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const defaultArr = new Array(props.length).fill("");
    const innerValue = computed<string>({
      get() {
        return props.value;
      },
      set(value) {
        emit("update:value", value);
      },
    });
    const codeArray: Ref<string[]> = ref(defaultArr);
    const changeCode = () => {
      const value = innerValue.value.replace(/[^0-9]/g, "");
      innerValue.value = value;
      const tempArr = [...value, ...defaultArr].slice(0, 6);
      codeArray.value = tempArr;
    };
    const isFocus = ref<boolean>(false);
    return {
      codeArray,
      innerValue,
      changeCode,
      isFocus,
    };
  },
});
</script>

<style scoped lang="scss">
.input-box {
  position: relative;
  height: 60px;
  width: 100%;
  .code-input {
    opacity: 0;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: transparent;
    z-index: 1;
  }
}
.code-list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .code {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 60px;
    border: 1px solid #e7e7e7;
    border-radius: 4px;
  }
}
@keyframes cursor-blink {
  0% {
    opacity: 1;
    display: block;
  }
  50% {
    opacity: 0;
    display: none;
  }
  100% {
    opacity: 1;
    display: block;
  }
}

.cursor-blink {
  position: relative;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 2px;
    height: 20px;
    background: #3490ff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: cursor-blink 2s infinite;
  }
}
</style>
