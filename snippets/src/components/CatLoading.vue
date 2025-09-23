<template>
    <!-- SVGの中身をそのまま貼り付け -->
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 430 430" class="cat-run">
        <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6">
            <!-- 左足 -->
            <g class="leg left-leg">
                <path stroke="#109121" d="m290.5 375.8-39.8-8.5V318m0 48.4 39.8-15.9" />
            </g>

            <!-- 右足 -->
            <g class="leg right-leg">
                <path stroke="#109121" d="m250.5 375.8-30-8.5V318m0 48.4 30-15.9" />
            </g>
            <path stroke="#121331"
                d="M304.9 157.3c-6.6-40-32-48.2-32-74.9 0-15.1 12.3-27.4 27.4-27.4 11.4 0 21.1 6.9 25.3 16.8 6.9.9 40 6.7 40 32.2-16.3-11.2-44.6-5.8-47.7-.6 0 0 44.9 76.8 46.3 130.6 1.4 54.1-47.5 84.3-106.1 84.3S143.9 274.6 143.9 236c0-25.7 55.6-88.2 114.2-88.2 15.6 0 33.4 4.5 46.8 9.5" />
            <path stroke="#121331"
                d="M279.1 149.501c-3.4-11.4-12.6-20.8-24.9-23.9-4.4-17.3-21.1-28.5-38.8-26-10.7-14.3-30.5-18.2-45.8-9.1-15.3-9.1-35.1-5.2-45.8 9.1-17.7-2.5-34.4 8.7-38.8 26-17.3 4.4-28.5 21.1-26 38.8-14.3 10.7-18.2 30.5-9.1 45.8-9.1 15.4-5.2 35.1 9.1 45.8-2.5 17.7 8.7 34.4 26 38.8l1.9 7.3c3.4 13.1 16.1 21.6 29.5 19.7 4.9-.7 9.5-2.7 13.4-5.7l39.1-30.8" />
            <path stroke="#121331"
                d="M301.1 267.3c-24.9 25.7-66 26.4-91.8 1.4-14.1-13.7-20.7-32.1-19.6-50.3 4 2.3 8.4 3.9 12.8 4.9 14.4 3.1 30-1.1 41-12.5 2.6-2.7 10.6-15 12.7-17.2 14-14.4 37.6-14.8 52-.8 15.9 15.4 13.1 42.1 3.4 60.1-2.8 5.2-6.3 10.1-10.5 14.4" />
        </g>
    </svg>
</template>

<script>
export default {
    name: 'CatLoading',
};
</script>

<style scoped>
.leg {
  transform-box: fill-box;
  transform-origin: top center; /* 股関節を基準に振る */
  animation: walk 1s ease-in-out infinite;
}

.left-leg {
  animation-delay: 0s;
}

.right-leg {
  animation-delay: 0.5s; /* 交互に動かす */
}

@keyframes walk {
  0%   { transform: rotate(25deg) translateX(5px); }
  50%  { transform: rotate(-25deg) translateX(-5px); }
  100% { transform: rotate(25deg) translateX(5px); }
}
</style>