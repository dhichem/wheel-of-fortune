<template>
  <div>
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
            <h3 class="text" @click="printDiv('printableArea')">
              êtes-vous prêt à tenter votre chance? Entrez votre numéro de
              téléphone ci-dessous pour avoir une chance de faire tourner la
              roue et d'économiser gros pour votre prochain achat.
            </h3>
            <input
              class="input"
              placeholder="N° telephone"
              type="tel"
              v-model="phoneNumber"
            />
            <div class="button-confirm" @click="checkPhone">
              Tentez votre chance!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="false" id="printableArea">
      <div style="text-align: center">
        <body>
          <div>
            <img
              src="@/assets/kastelo.jpg"
              alt="Logo"
              style="width: 30%; margin-bottom: 0.2cm"
            />
            <br />
            <span style="font-size: 18px; font-weight: bold">kastelo</span>
            <br />
            <br />
            <span style="font-size: 18px">Merci pour votre visite!</span><br />
            <br />
            <span style="font-size: 15px">Félicitations vous avez gagnez</span>
            <br />
            <span style="font-size: 18px; font-weight: bold">
              {{ prizeValue }}
            </span>
            <br />
            <span style="font-size: 18px"> de votre prochain achat!</span>
            <br />
            <br />
            <p style="float: right">N° tel: {{ phoneNumber }}</p>
            <p style="float: left">
              Date:
              {{
                new Date().getDate() +
                "/" +
                (new Date().getMonth() + 1) +
                "/" +
                new Date().getFullYear()
              }}
            </p>
          </div>
        </body>
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
      prizeValue: "",
      participant: [],
      showSpin: false,
      showLoader: false,
      phoneNumber: "",
      cavansVerify: true, // Whether the turntable in canvas mode is enabled for verification
      prizes: [
        {
          id: 1, //* The unique id of each prize, an integer greater than 0
          value: "25% de remise", //* Prize value, return value after spinning
          probability: 10, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
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
          value: "30% de remise", //* Prize value, return value after spinning
          probability: 5, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 4, //* The unique id of each prize, an integer greater than 0
          value: "Perdu", //* Prize value, return value after spinning
          probability: 15, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: false,
        },
        {
          id: 5, //* The unique id of each prize, an integer greater than 0
          value: "25% de remise", //* Prize value, return value after spinning
          probability: 10, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 6, //* The unique id of each prize, an integer greater than 0
          value: "Encore une fois", //* Prize value, return value after spinning
          probability: 15, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: false,
        },
        {
          id: 7, //* The unique id of each prize, an integer greater than 0
          value: "30% de remise", //* Prize value, return value after spinning
          probability: 5, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
          name: true,
        },
        {
          id: 8, //* The unique id of each prize, an integer greater than 0
          value: "Dommage", //* Prize value, return value after spinning
          probability: 20, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
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
  mounted() {
    if (localStorage.getItem("participants") === null) {
      localStorage.setItem("participants", this.participant);
    } else {
      console.log("ffffffffff");
    }

    // console.log(this.datePrize);
    // console.log(this.isToday(this.datePrize));
  },
  methods: {
    printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
    },
    isToday(someDate) {
      const today = new Date();
      return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
      );
    },
    showPopupPrize(title, message, confirmation) {
      this.PopupPrize = {
        active: true,
        title: title,
        message: message,
        confirmation: confirmation,
      };
    },
    getStorage() {
      if (
        localStorage.getItem("participants") !== null &&
        localStorage.getItem("participants") !== ""
      ) {
        return JSON.parse(localStorage.getItem("participants"));
      } else {
        return [];
      }
    },
    checkPhone() {
      if (this.phoneNumber.length == 8) {
        let participants = this.getStorage();
        let participant = participants
          .slice()
          .reverse()
          .find((o) => o.phone === this.phoneNumber);
        if (participant !== undefined) {
          if (this.isToday(new Date(participant.date))) {
            this.showPopupPrize(
              "Erreur",
              `Vous avez déja tentez votre chance aujourd'hui`,
              "Fermer"
            );
          } else {
            this.showSpin = true;
          }
        } else {
          this.showSpin = true;
        }
      } else {
        this.showPopupPrize(
          "Erreur",
          `Le numero de telephone est erroné`,
          "Fermer"
        );
      }
    },
    onImageRotateStart() {
      console.log("onRotateStart");
    },

    onRotateEnd(prize) {
      this.prizeValue = prize.value;

      if (prize.name == true) {
        setTimeout(() => {
          this.printDiv("printableArea");
        }, 500);

        this.showPopupPrize(
          prize.value,
          `Félicitations vous avez gagnez ${prize.value} lors de votre prochain achat!`,
          "Imprime ticket en cours ..."
        );

        setTimeout(
          function () {
            this.phoneNumber = "";
            this.prizeValue = "";
            this.$router.go();
          }.bind(this),
          5000
        );
      } else {
        setTimeout(() => {
          this.printDiv("printableArea");
        }, 500);

        this.showPopupPrize(
          prize.value,
          `Ne perdez pas espoir la prochaine sera la bonne!`,
          "Réessayer"
        );
        setTimeout(
          function () {
            this.$router.go();
          }.bind(this),
          4000
        );
      }
      this.saveParticipant(prize.value);
      this.showSpin = false;
    },
    saveParticipant(prize) {
      let existingParticipant = this.getStorage();
      let entry = {
        phone: this.phoneNumber,
        prize: prize,
        date: new Date(),
      };
      existingParticipant.push(entry);
      localStorage.setItem("participants", JSON.stringify(existingParticipant));
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

@media print {
  .hidden-print,
  .hidden-print * {
    display: none !important;
  }
}
</style>