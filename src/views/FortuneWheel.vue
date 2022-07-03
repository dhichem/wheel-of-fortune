<template>
  <div>
    <vue-element-loading :active="showLoader" is-full-screen />
    <div class="split left">
      <div class="centered">
        <img src="@/assets/arrow.png" class="arrow" />
        <!-- type: image -->
        <FortuneWheel
          style="width: 40vw"
          type="image"
          :prizes="prizes"
          :angleBase="-10"
          @rotateStart="onImageRotateStart"
          @rotateEnd="onRotateEnd"
        >
          <img slot="wheel" src="@/assets/wheel.png" />
          <img
            v-if="showSpin"
            style="width: 100px"
            slot="button"
            src="@/assets/button.png"
          />
        </FortuneWheel>
      </div>
      <div class="split right">
        <div class="centered">
          <h3 class="text">
            êtes-vous prêt à tenter votre chance? Entrez votre numéro de
            téléphone ci-dessous pour avoir une chance de faire tourner la roue
            et d'économiser gros pour votre prochain achat.
          </h3>
          <input class="input" type="tel" v-model="phoneNumber" />
          <div class="button-confirm" @click="checkPhone">
            Tenetez votre chance!
          </div>
        </div>
      </div>
    </div>
    <PopupPrize
      :active.sync="PopupPrize.active"
      :confirmationButton="PopupPrize.confirmation"
      :title="PopupPrize.title"
      :message="PopupPrize.message"
    ></PopupPrize>
  </div>
</template>

<script>
import FortuneWheel from "vue-fortune-wheel";
import "vue-fortune-wheel/lib/vue-fortune-wheel.css";
import VueElementLoading from "vue-element-loading";
import PopupPrize from "../components/popup/PopupPrize.vue";

export default {
  components: {
    FortuneWheel,
    VueElementLoading,
    PopupPrize,
  },
  data() {
    return {
      showSpin: false,
      showLoader: false,
      phoneNumber: "",
      cavansVerify: true, // Whether the turntable in canvas mode is enabled for verification
      prizes: [
        {
          id: 1, //* The unique id of each prize, an integer greater than 0
          value: "25% de remise", //* Prize value, return value after spinning
          probability: 1, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 2, //* The unique id of each prize, an integer greater than 0
          value: "Pas de chance", //* Prize value, return value after spinning
          probability: 20, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: false,
        },
        {
          id: 3, //* The unique id of each prize, an integer greater than 0
          value: "10% de remise", //* Prize value, return value after spinning
          probability: 2, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 4, //* The unique id of each prize, an integer greater than 0
          value: "Perdu", //* Prize value, return value after spinning
          probability: 20, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: false,
        },
        {
          id: 5, //* The unique id of each prize, an integer greater than 0
          value: "5% de remise", //* Prize value, return value after spinning
          probability: 5, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 6, //* The unique id of each prize, an integer greater than 0
          value: "Encore une fois", //* Prize value, return value after spinning
          probability: 20, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: false,
        },
        {
          id: 7, //* The unique id of each prize, an integer greater than 0
          value: "20% de remise", //* Prize value, return value after spinning
          probability: 2, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 8, //* The unique id of each prize, an integer greater than 0
          value: "Dommage", //* Prize value, return value after spinning
          probability: 30, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: false,
        },
      ],
      PopupPrize: {
        active: false,
        title: "",
        message: "",
        confirmation: "",
      },
    };
  },
  methods: {
    showPopupPrize(title, message, confirmation) {
      this.PopupPrize = {
        active: true,
        title: title,
        message: message,
        confirmation: confirmation,
      };
    },
    checkPhone() {
      if (this.phoneNumber.length == 8) {
        this.showSpin = true;
      }
    },
    onImageRotateStart() {
      console.log("onRotateStart");
    },

    onRotateEnd(prize) {
      this.showSpin = false;
      if (prize.name == true) {
        this.showPopupPrize(
          prize.value,
          `Félicitations vous avez gagnez ${prize.value} lors de votre prochain achat!`,
          "Imprimez ticket"
        );
      } else {
        this.showPopupPrize(
          prize.value,
          `Ne perdez pas espoir la prochaine sera la bonne!`,
          "Réessayer"
        );
      }
    },
    // Simulate the request back-end interface, verified: whether to pass the verification, duration: delay time
    DoServiceVerify(verified, duration) {
      return new Promise((resove) => {
        setTimeout(() => {
          resove(verified);
        }, duration);
      });
    },
  },
};
</script>

<style scoped>
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
.left {
  left: 0;
  background-color: #f5f5f5;
}

.right {
  right: 0;
  background-color: #171617;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.arrow {
  position: absolute;
  top: 3%;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  height: 11vh;
}
.text {
  font-family: "Tw Cen MT Condensed Extra Bold";
  color: #f5f5f5;
  width: 36vw;
}
.input {
  width: 24vw;
  height: 3vw;
  text-align: center;
  font-size: 1.6rem;
  background-color: #f5f5f5;
  font-family: "Tw Cen MT Condensed Extra Bold";
  border: none;
  border-radius: 20px;
}
.button-confirm {
  width: 24vw;
  height: 3vw;
  text-align: center;
  margin: 3.5vh auto;
  font-size: 1.3rem;
  line-height: 3vw;
  background-color: #f5f5f5;
  font-family: "Tw Cen MT Condensed Extra Bold";
  border-radius: 20px;
}
.input:focus {
  outline: none;
}
.button-spin {
}
</style>