var matches = new Vue({
    el: '#matches',
    data: {
        matchesList: [],
    },
    methods: {
        getTime: function(date) {
            return moment(date).fromNow();
        }
    }
})

axios.post('/getMatches').then((response) => {
    for(let i = 0; i < response.data.length; i++) {
        if(response.data[i].team1 != undefined && response.data[i].team2 != undefined) {
            let match = response.data[i];
            for(map in match.maps) match.maps[map] = mapsTranslator[match.maps[map]];
            if(!match.maps) match.maps = [undefined];
            matches.matchesList.push(match);
        }
    }
})
