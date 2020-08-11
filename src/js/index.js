var app = new Vue({
    el: '#app',
    data: {
        allRelationships: [],
        filteredRelationships: [],
        relatieType: [],
        activeFilter: 'Alle relaties',
        inputSearch: "",
        activeProfile: '',
        // activePage: 'relaties',
        currentTableOrder: 'mixed'

    },

    created: function () {
        this.getLocalData('./data.json', 'allRelationships');
    },

    computed: {
        setInputFilter: function () {
            this.filteredRelationships = this.allRelationships.filter((allrelations) => {
                return allrelations.first_name.toLowerCase().match(this.inputSearch.toLowerCase()) ||
                    allrelations.second_name.toLowerCase().match(this.inputSearch.toLowerCase()) ||
                    allrelations.email_address.toLowerCase().match(this.inputSearch.toLowerCase()) ||
                    allrelations.phone_number.toLowerCase().match(this.inputSearch.toLowerCase());
            });
            return this.filteredRelationships;
        }
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

        // Collects, sorts and pushes and sorts the relation types from JSON file to relatieType array to set up the menu bar on the UI.
        collectRelatieType: function () {
            this.allRelationships.map(el => {
                el.relatie_type.map(elm => {
                    if (!this.relatieType.includes(elm)) {
                        this.relatieType.push(elm);
                    }
                })

            });

            this.relatieType.sort().push('Alle relaties');
        },

        // Sets the activeFilter, calls the function which clears the filteredRelationships array, calls the necessary filtering function regarding the relation to set the filteredRelationships array.
        setActiveFilter: function (filter) {
            this.activeFilter = filter;
            this.clearFilteredRelationships();
            this.activeFilter == 'Alle relaties' ? this.getAllRelationships() : this.fillFilteredRelations(filter);
        },

        // Sets the activeProfile.
        setActiveProfile: function (member) {
            this.activeProfile = member;
        },

        // Fills the filteredRelationships array with the active relation members.
        fillFilteredRelations: function (relation) {
            this.allRelationships.map(el => {
                el.relatie_type.map(elm => {
                    if (this.activeFilter == relation && elm == relation) {
                        this.filteredRelationships.push(el);
                    }
                })
            });
        },

        formatPhoneNumber: function (phoneNumberString) {
            var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/)
            if (match) {
                return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4]
            }
            return null
        },

        /*  pageActivator: function () {

             this.activePage == 'relaties' ? this.activePage = 'evenementen' : this.activePage == 'relaties';

         } */

        sortDataInTable: function (category) {
            var orderToUse = '';
            this.filteredRelationships.sort(
                function (a, b) {
                    if (app.currentTableOrder == 'mixed' || app.currentTableOrder == 'descending') {
                        orderToUse = 'ascending';
                        if (a[category] < b[category]) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        orderToUse = 'descending';
                        if (a[category] < b[category]) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            );
            this.currentTableOrder = orderToUse;
        }


    }


})