var app = new Vue({
    el: '#app',
    data: {
        allRelationships: [],
        filteredRelationships: [],
        relatieType: [],
        activeFilter: 'Alle relaties',
        inputSearch: ""

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
                    app[destination] = json;

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
                el.relatie_type.map(elm => {
                    if (!this.relatieType.includes(elm)) {
                        this.relatieType.push(elm);
                    }
                })

            });

            this.relatieType.push('Alle relaties');
        },

        setActiveFilter: function (filter) {
            this.activeFilter = filter;
            this.clearFilteredRelationships();
            this.activeFilter == 'Alle relaties' ? this.getAllRelationships() : this.fillFilteredRelations(filter);
        },

        fillFilteredRelations: function (relation) {
            this.allRelationships.map(el => {
                el.relatie_type.map(elm => {
                    if (this.activeFilter == relation && elm == relation) {
                        this.filteredRelationships.push(el);
                    }
                })
            });
        }
    },

    computed: {
        setInputFilter: function () {
            /* this.inputSearch == '' ? this.getAllRelationships() : console.log('filtering'); */
            // this.clearFilteredRelationships();
            this.clearFilteredRelationships();
            this.filteredRelationships = this.allRelationships.filter((allrelations) => {
                return allrelations.first_name.toLowerCase().match(this.inputSearch.toLowerCase()) || 
                allrelations.second_name.toLowerCase().match(this.inputSearch.toLowerCase());
            });
            
            return this.filteredRelationships;

        }
    }
})