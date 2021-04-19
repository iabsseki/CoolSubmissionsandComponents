// This component is for creating the buttons
Vue.component("character", {
  data: function () {
    return {
      buttonText: this.name, // button name initiator
      codeNameFront: false // starts as true and flips to false when button is clicked
    };
  },
  props: ["name", "cname", "flipped"],
  methods: {
    flipFunction: function () {
      if (this.codeNameFront) {
        this.buttonText = this.name;
      } else {
        this.buttonText = this.cname;
      }
      this.codeNameFront = !this.codeNameFront; // changes CNFront to opposite T/F value
      this.flipped = !this.flipped; // changes flipped to opposite T/F value
    }
  },
  template: `<button v-on:click="flipFunction" v-bind:class="{backgroundFlip: flipped}">{{buttonText}}</button>` // if flipped is true, the class 'backgroundFlip' is assigned, which is what assigns black background
});

var app = new Vue({
  el: "#app",
  data: {
    name: "",
    email: "",
    nameGood: false, // if name meets >= 2 characters, this will become true
    emailGood: false, // if email meets email format, this will become true
    list: [
      { name: "Protagonist", codename: "Joker", flipped: false },
      { name: "Anne", codename: "Panther", flipped: false },
      { name: "Ryuji", codename: "Skull", flipped: false }
    ]
  },

  watch: {
    // This function changes var nameGood to true if name.length >=2
    name: function () {
      if (this.name.length >= 2) {
        this.nameGood = true;
      } else {
        this.nameGood = false;
      }
    },

    // This function changes var emailGood to true if email has valid formatting
    email: function () {
      var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var result = validEmail.test(this.email);

      if (result) {
        this.emailGood = true;
      } else {
        this.emailGood = false;
      }
    }
  }, // end of watch

  computed: {
    // submit automatically checks if nameGood and emailGood are true, if so, displays submitted
    submit: function () {
      if (this.name.length < 1 && this.email.length < 1) {
        return "";
      } else if (this.nameGood && this.emailGood) {
        return "Submitted";
      } else {
        return "Not Submitted";
      }
    },

    // whatLeft suggests what needs to be changed in order to have a successful submission
    whatLeft: function () {
      if (this.name.length < 1 && this.email.length < 1) {
        return "";
      } else if (!this.nameGood && !this.emailGood) {
        return "Name needs 2 characters & email needs to be formatted as email@domain.xx";
      } else if (!this.nameGood && this.emailGood) {
        return "Your name needs at least 2 characters dummy";
      } else if (this.nameGood && !this.emailGood) {
        return "Your email needs to be formatted as email@domain.xx";
      } else {
        return "";
      }
    }
  } // end of computed
});