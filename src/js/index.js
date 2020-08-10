new Vue({
    el: '#app',
    data: {
        allRelationships: [],
        filteredRelationships: [],
        relatieType: []
    },

    created: function () {
        this.getLocalData('./data.json', 'allRelationships');
    },

    methods: {
        // Fetching data from local json file and error handling.
        getLocalData: function (link, destination) {
            fetch(link, {
                    method: "GET",
                })
                .then(response => response.json())
                .then(json => {
                    this[destination] = json;

                    if (this.filteredRelationships == '') {
                        this.collectRelatieType();
                        this.getAllRelationships();
                    };
                })
                .catch(error => error);
        },

        // Fills the filteredRelationships array with all relations.
        getAllRelationships: function () {
            this.filteredRelationships = this.allRelationships;
        },

        // Clears the filteredRelationships array.
        clearFilteredRelationships: function () {
            this.filteredRelationships = [];
        },

        collectRelatieType: function () {
            this.allRelationships.map(el => {
                el.relatie_type.map(elm =>{
                    if (!this.relatieType.includes(elm)) {
                    this.relatieType.push(elm);
                }} )

            });

            this.relatieType.push('Alle relaties');
        }
    }
})