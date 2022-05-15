const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      healthPlayer: 100,
      healthMonster: 100,
      round: 0,
      winner: null,
      logs: [],
    };
  },
  methods: {
    attackMonster() {
      const value = random(8, 15);
      this.healthPlayer -= value;
      this.addLogs("Monster", "Attack", value);

      this.round++;
    },
    attackPlayer() {
      const value = random(5, 12);
      this.healthMonster -= value;
      this.addLogs("Player", "Attack", value);
      this.attackMonster();
    },
    superAttack() {
      const value = random(10, 25);
      this.healthMonster -= value;

      this.addLogs("Player", "Special attack", value);
      this.attackMonster();
    },
    heal() {
      const randomHealth = random(8, 20);
      if (this.healthPlayer + randomHealth > 100) {
        this.healthPlayer = 100;
      } else {
        this.healthPlayer += random(8, 20);
      }

      this.addLogs("Player", "Heal", randomHealth);
      this.attackMonster();
    },
    newGame() {
      this.healthMonster = 100;
      this.healthPlayer = 100;
      this.round = 0;
      this.winner = null;
      this.logs = [];
    },
    surrender() {
      this.healthPlayer = 0;
    },
    addLogs(who, what, value) {
      const log = {
        actionBy: who,
        actionType: what,
        actionValue: value,
      };
      this.logs.unshift(log);
    },

    logSpan(log) {
      return {
        "log--player": log.actionBy == "Player",
        "log--monster": log.actionBy == "Monster",
      };
    },
    logHealth(health) {
      return health >= 0 ? health : 0;
    },
    /*     winner() {
      if (this.healthMonster <= 0) {
        return "Player won !";
      }
      if (this.healthPlayer <= 0) {
        return "Monster won !";
      }
      return "It's a draw.";
    }, */
  },
  computed: {
    healthBarMonster() {
      if (this.healthMonster <= 0) {
        return { width: "0%" };
      }
      return { width: this.healthMonster + "%" };
    },
    healthBarPlayer() {
      if (this.healthPlayer <= 0) {
        return { width: "0%" };
      }
      return { width: this.healthPlayer + "%" };
    },
    mayUseSpecialAttack() {
      return this.round % 3 != 0;
    },
    displayHealthPlayer() {
      return this.healthPlayer >= 0 ? this.healthPlayer : 0;
    },
    displayHealthMonster() {
      return this.healthMonster >= 0 ? this.healthMonster : 0;
    },
    /*     endedBattle() {
      return this.healthMonster <= 0 || this.healthPlayer <= 0;
    }, */
  },
  watch: {
    healthPlayer(value) {
      if (value <= 0 && this.healthMonster <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    healthMonster(value) {
      if (value <= 0 && this.healthPlayer <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
