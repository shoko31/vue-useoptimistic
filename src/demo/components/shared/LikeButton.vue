<template>
  <div class="like-button" :class="{ liked, disabled }" @click="clicked()">
    <template v-if="liked">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFa0lEQVR4nO2ZXUxTZxzGG5278GIX8lHQQkVY5cNaEeioIpVRacUCSin0gyGIIvKx2y3csCv1asnmjJplN8uybDPqxXQ3XphsV8sU0Lanpx+UfkKhLcNJhDLNs7xdliwb7elpD2VLeJKTc3Mufs/b9/zP8z7l8ba0pS2lLWi12yP1w7KF+sGxhbrBO/NHByxB2YXFoOz82lxt/1pQem5xVtpnDtT03QlU9475Dp+tBW98G2+zFTl2qSAsH7oaqh/yh+ovIXRsEAt1FzF/ZADzsgsI1p5H8J1+zEnPYbamD7PVvQgcPotAZQ/8h97z+SXdV3xioyDj4L/VjeaEG0ZuheRD0bB8CCnAwy/phu8guYxRr1h/IyDSZ2cEfrFh2BA+PhwJHx8GB/Dwig3wHtDDXaELe0s7dRsGjqqBHeGGkc8jDSPgGt5ToYenXAd3WRfcpdqbj6sGdnAKH1AP7Aw3jP6w4fBlnZgp7YRrf8eDQL56J4crnzn4mf1auEQdcJVoHprLtW+mbSAj26bsH/BvazBdosF0cfuNtOAXG0eNmwZf0g5n8Rk4itu6UoJ/3jicFW4YCW0mvHPfaTiKWiO0SM1+xJI5v/nwbXDsbYOjsPU6O3j5qCCZj1RA2oeZ6h7YK42wSQywHzRgWmKAV2L8F/xMhQ72sk5YSjUwi9phErWDFmngFGkSwwtbYS9UR6f3qQtZGBi6ygTvrekFLe9H8Pq3WJ6yIeoLYnmSxty1b2CR9cEp1sMjNsBzQA97eRdMNT0IfPI1XjyxYtU7hxcTVvg//gpPD+lAF5+JDy9sIQZgE5y6khQ8xse3heov+RLBe2p64TSMYS30K9bTq+fL8H50C1SZFpZSLbzjN/Fq6cW6z0aDEVAt74Pa1xYfvkANek+zHzztdkYDJFUybRubYhC/h5fApNB3DxG6/ZDxubWFRUxV6mEral0X3iY4RQyQu5TRAInEiV5YsucXvrwPrjV76zbMwpa48LErX/Uhs4Fjg3cTTRu60oCob55zAyszAUwWNseH330SVP7J28wG6i6aE41Ki0SP16tRzg28XonilwJlXHhrzIDyGaOB+SMDkURznj6ox0vazbmBZbMDEwWquPDWfBWoPGWI2YDsQjTRR8olMcJ/+QvODbjGPoVJ0BwXPmaAr1xlNBCsPR9N9IX1SbpBSfSxec6Vnv9swhOhGnQCeGueChZ+UxIGpOciTPHALTbAUtePFacvbfiXdg8mJJ2gBM0J4ak8JSy5TcxbiLQHyWQbV4UOpqN9MYCU4Z0+TB7WJwVP8ZXkF2B+iWere+8mG8ymy7rwTHY2JRNs4Sl+E6jcJuYxSnobNqnSWarFs9oeViZShIc5R/EBowFSOrGNxE5RB55Ku5MykSq8JfcETFmNNYwGSGPmO9TtZZvnHSXtmKruxkube0PgLTknPEm3ebHGLIXDiL34DCarjOuaWJlOCx6WbMXlpOBj20hsFPzZmLE/SdmK2mKgfzeRLrw5W7Fq2/XuHh4bkbov1WMgLWzFZJUBSz9NYOnHJ5io1KW+8jlk9RuvsYKPGSjX7nJX6EIpnWGFrbAK1ZgqUGFSoEoL3pytCNP58tR6U9JVpgKfKBKzW3kFuWt56Yh0lZsFb8pu/IyXrsg51LW/416m4c1ZivuPePI3eFyIFK2uEs2DDMJ//5ircvcvkcqbdJWZ2DaPuFr59US6SsfethDX8OasxoW0X9hkRe0+nUXqPlthy2q68OZsxSqZ8+a3mnbxMi2b4NQe0pjRgmYve3iFl8QD1l/YjRAJWaR0Ir0NqT5Ie2DNU0WsfGWU4jdFqVxlxMI/8ZTkeRKJSar8T/zNuqUt8f7/+gM6KYM5OV1PYAAAAABJRU5ErkJggg=="
      />
      <p>{{ dislikeText }}</p>
    </template>
    <template v-else>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgElEQVR4nO2azUtVQRjGf6Ve9UYF3VxUtimptkXpImgXBGFp/0O1KdFctAtLqbZFEGKriKAiNy1atChyFaVYEQWVt3KTn5EVaB/cGHgvyMHrmXNm5ty5eB544HKdO8/7jGfmzPvOQIoUKVK4RTXQAnQDA8BTYAyYBX4DC/J5TP42IG1b5LcViQzQDgwCc0AhJr8D94E26dN7bAT6gGkD06Wo+uwVDe+wBrgM/HRgPEilcVE0vUAb8CUB40F+Bo6W03gdcKUMxoO8CWSTNt8IjHpgvsgRYHNS5rcDHzwwHeQnYKdr87uASQ/MluIEsMOV+S1A3gOTYRwHtrpY8EY9MKfLYaDW5gD0e2AqKq/ZMt/ugZm4bDU1n62Qeb/cZslox3jJAxOmVPlDLOSAHx4YsJE7xEqg+jwI3hbPRzWfcZTSlotTUesJxyyK/wVeAo+AF8D8Mm3npY1q+0p+ayuOSJnjoAXBX8C5JeafWpVPy46t2Fal06eWyOoagB7pyzSeu7rmq6UUZSL2FdgdorMOuCeBrQ1pu0f2+SYxfQOqdAagxVDoH7Bfc7BXC3VwQPo2iW2fjlC3ocgt3OG2YWxdOiI3DEUOOhyAQ4axqZwmFEOGIhscDkCDYWxPdETyhiIqdXaFOsPY1OFLKKYNRZxVZKTkZbohCsWCoUiHwwHoMIxtPokBeBfh1RYFqs83SQzAjKGI4nEHA3DSQlxaUyBvQUjtuposmm+SPgtJLIJDFoQU3wLrLZhX2+TXlmLSeg0OWBJTfADUGJivkT5sxaO1ETpjUbAgmWWcs/2Mpax0MTt1hJstixafhPoI5ust/+eL3JtUOlwocYCpc2KzCXjmQF87HUaupRQccFyesFJoDhRKbPIOnhyG/AHOAqsCmicsbMKsHZJkEiiKPpR7Bo3y2aXWZJy3Ua/joIrz0sYGJ4yqrhgZuZV+MILcxipUOC9ggOxKPxxFDhQKFcrDWMJ1D8xE5VUs1+JGPDCly+e2r8gg9/AqYT0Yk+20s6LkhAcmy3JNrohtwHsPzAaZT+Ki5OLpMOyB6cVz3tljXwq1nlyW7nex4EVBq9zTLcdiZ+09b4qsJE9J5A5zsr2NUmFKDDm5kDTlKKXtcXz4ag2qnnBEbn+YpLuzUslpNawulxVVcjOjSxYsVZv/KCdQC8IZ+e6xtOmUAqZ2DS9FihQpiIH/OK464sQUtfUAAAAASUVORK5CYII="
      />
      <p>{{ likeText }}</p>
    </template>
    <p v-if="numberOfLikes">Number of likes : {{ numberOfLikes }}</p>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

export interface Events {
  (e: "click"): void;
}
export interface Props {
  disabled?: boolean;
  liked?: boolean;
  numberOfLikes?: number;
  likeText?: string;
  dislikeText?: string;
}

const emit = defineEmits<Events>();
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  liked: false,
  likeText: "Like me!",
  dislikeText: "Click to dislike",
});
const { disabled, liked, numberOfLikes } = toRefs(props);

function clicked() {
  if (!disabled.value) {
    emit("click");
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 64px;
  width: 64px;
}

.like-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  position: relative;
  border: 1px solid black;
  background-color: #efefef;
  border-radius: 5px;
  padding: 15px 10px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  user-select: none;

  &:not(.disabled):hover {
    background-color: #ffefef;
  }

  &.disabled {
    cursor: default !important;
  }
}
</style>
