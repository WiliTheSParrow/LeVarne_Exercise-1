new Vue({
    el: '#app',
    data: {
        array: [1, 2, 3, 4],
        allRelationships: [1, 2, 3, 4],
        filteredRelationships: []

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

                    /* if (app.filteredRelationships == '') {
                        this.getAllRelationships();
                    }; */
                })
                .catch(error => error);
        },

        // Fills the filteredRelationships array with all relations.
        getAllRelationships: function () {
            this.filteredRelationships = this.allRelationships;
        },

    }
})