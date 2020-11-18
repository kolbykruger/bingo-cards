let app = new Vue({
    el: '#app',
    data: {
        wordInput: '',
        wordList: [],
        stage: '1',
        url: '',
        wordsLeft: '',
        gameLink: ''
    },
    methods: {
        createCards: function() {
            let arr = this.createArray(this.wordInput);
            this.wordList = arr.filter(function(e){return e});
        },
        createArray: function(str) {
            if (str) {
                if (Array.isArray(str)) {
                    return str;
                } else {
                    return str.split('\n');
                }
            }
        },
        shuffleArray: function(arr) {
            return arr
                .map((a) => ({sort: Math.random(), value: a}))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value)
        },
        clickCard: function(event) {
            event.target.style.transform = 'rotateY(90deg)';
            event.target.classList.add('card-used');

            let cardsLeft = event.target.parentNode.querySelectorAll('.card-item:not(.card-used)');
            console.log(cardsLeft.length)

            this.wordsLeft = cardsLeft.length;

            setTimeout(function(){

                event.target.style.display = 'none';

                if (cardsLeft.length >= 1) {

                    let randomSelection = cardsLeft[Math.floor(Math.random() * cardsLeft.length)];
                        randomSelection.style.display = 'block';
                        randomSelection.style.transform = 'translate(0, 0)';

                } else {
                    let parent = event.target.parentNode;
                    parent.innerHTML = `<div class="card-item card-last">Game Over</div>`
                }

            }, 350);
        },
        createGameLink: function() {

            if (this.wordList.length >= 1) {
                this.gameLink = this.url+'?&words='+this.wordList;
            } else {
                this.gameLink = 'There was an error. Please try again.'
            }
        },
        inputSelection: function(event) {
            event.target.select()
            document.execCommand('copy')
        },
        updateCards: function() {
            this.createCards()
        }
    },
    created() {
        let url = window.location.href;
        let urlObj = new URL(url);
        let words = urlObj.searchParams.get('words');

        this.url = url;

        if (words) {
            this.stage = '2';
            let arr = words.split(',');

            let shuffled = this.shuffleArray(arr);

            this.wordList = shuffled;

        }
    },
    mounted() {
        this.$el.classList.add('app-mounted')
    }
})
