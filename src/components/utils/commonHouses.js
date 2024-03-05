import { useHouseStore } from "../../services/store";
import housingApiService from "../../services/HousingApiServices";
export default {
  data() {
    return {
      showDeleteModal: false, // associated with delete icon, if true delete popup page will be displayed
      searchQuery: "", // to store search bar user query
      searchMessage: "", // result of number of houses
      sortBy: "price", // by default to view sorted houses by price
      houses: [], // initially setting house details as empty array, loaded on mounted action
    };
  },
  watch: {
    showDeleteModal(value) {
      if (value) {
        // When showDeleteModal is true, add the no-scroll class to prevent the background from scrolling
        document.body.classList.add("no-scroll");
      } else {
        // When showDeleteModal is false, remove the no-scroll class to allow scrolling again
        document.body.classList.remove("no-scroll");
      }
    },

    // when we search any house attibuted in search bar this method is called
    searchQuery(newQuery) {
      if (!newQuery) {
        this.searchMessage = "";
      }
    },
  },

  mounted() {
    // Fetch the house data when the component created
    this.fetchHouses();
  },

  computed: {
    filteredAndSortedHouses() {
      // house containder depends on this method to display result filtered on sorting
      let result = this.filterHouses(this.houses);
      result = this.sortHouses(result);
      return result;
    },
  },

  methods: {
    async fetchHouses() {
      try {
        const response = await housingApiService.getAllHouses();

        if (response.status !== 200) {
          throw new Error("Failed to get houses ");
        }
        this.houses = response.data;
        // this.houses = this.sampleHousesData();
      } catch (error) {
        window.alert(
          "Error fetching houses: " + error.message + ", try after some time!!"
        );
      }
    },

    // if create clicked, directed to houseform
    createHouse() {
      const houseStore = useHouseStore();
      houseStore.clearListing();
      this.$router.push({ name: "HouseForm" });
    },

    //if edit icon clicked, directed to houseform page
    editHouse(houseId) {
      // checking if the houseid if same, to fetch the details of the house
      const listing = this.houses.find((house) => house.id === houseId);

      const houseStore = useHouseStore();
      houseStore.setListing(listing);
      this.$router.push({ name: "HouseForm" });
    },

    showDeletePopup(houseId) {
      if (houseId) {
        this.selectedHouseId = houseId;
        this.showDeleteModal = true;
      }
    },

    setSortCriteria(criteria) {
      this.sortBy = this.sortBy === criteria ? "" : criteria;
    },

    // if clear icon clicked this method is called and clearing query and message
    clearSearch() {
      this.searchQuery = "";
      this.searchMessage = "";
      this.fetchHouses();
    },

    //directed to house details page if we click any houselayout
    goToHouseDetails(houseId) {
      this.$router.push({ name: "HouseDetails", params: { id: houseId } });
    },

    filterHouses(toFilterList) {
      if (!this.searchQuery) {
        return toFilterList;
      }

      const filtered = toFilterList.filter((house) =>
        house.location.city
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      // Update search message based on results
      if (!this.searchQuery) {
        this.searchMessage = "";
      } else if (filtered.length > 0) {
        this.searchMessage = `${filtered.length} result(s) found`;
      } else {
        this.searchMessage = "";
      }
      return filtered; // Return unfiltered houses by default
    },

    sortHouses(toSortList) {
      // Use a computed property to return the houses sorted by the selected criteria
      if (this.sortBy === "price") {
        return toSortList.slice().sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "size") {
        return toSortList.slice().sort((a, b) => a.size - b.size);
      }
      return toSortList; // Return unsorted houses by default
    },

    sampleHousesData() {
      return (this.houses = [
        {
          id: 2,
          image: "https://api.intern.d-tt.nl/uploads/house1.jpg",
          price: 123,
          rooms: {
            bedrooms: 1,
            bathrooms: 1,
          },
          size: 500,
          description: "oui",
          location: {
            street: "street",
            houseNumber: 20,
            houseNumberAddition: null,
            city: "assas",
            zip: "asasdd",
          },
          createdAt: "2020-05-07",
          constructionYear: 2000,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 3,
          image: "https://api.intern.d-tt.nl/uploads/house2.jpg",
          price: 969000,
          rooms: {
            bedrooms: 3,
            bathrooms: 1,
          },
          size: 153,
          description:
            "Dit bijzondere appartement is gelegen op de bel-etage en in het souterrain van een Rijks monumentaal grachten pand ter hoogte van de 'Negen-straatje'. Deze woning kenmerkt zich door de vele originele details die behouden zijn. Bij de renovatie is met de grootste aandacht zorg gedragen voor het conserveren van de oorspronkelijke stijlelementen. Met name in de monumentale stijlkamer aan de voorzijde van de woning. Terwijl de keuken dan weer modern en state of the art is.",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1016 BV",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 4,
          image: "https://api.intern.d-tt.nl/uploads/house3.jpg",
          price: 795000,
          rooms: {
            bedrooms: 3,
            bathrooms: 1,
          },
          size: 153,
          description:
            "Heerlijk licht en groot bovenhuis van 153 m² met eigen opgang. Het karakteristieke pand uit 1886 staat op EIGEN GROND en ligt in de populaire Oosterparkbuurt. De woning ligt op een steenworp afstand van het mooie Oosterpark en de Dappermarkt. Alle denkbare voorzieningen vindt u in de buurt. Zeer goed bereikbaar met zowel de auto als het openbaar vervoer en op loopafstand van het NS station Muiderpoort.",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1092 CK",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 5,
          image: "https://api.intern.d-tt.nl/uploads/house4.jpg",
          price: 1500000,
          rooms: {
            bedrooms: 5,
            bathrooms: 2,
          },
          size: 160,
          description:
            "Op een top locatie in Oud-Zuid ligt dit zojuist hoogwaardige gerenoveerde dubbel bovenhuis van 160 m² (NEN-meting) met eigen opgang vanaf de straat en met ruim dakterras en nieuwe fundering.",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1071 EV",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 6,
          image: "https://api.intern.d-tt.nl/uploads/house5.jpg",
          price: 725000,
          rooms: {
            bedrooms: 6,
            bathrooms: 3,
          },
          size: 157,
          description:
            "Op een prachtige locatie in het buitengebied van Amsterdam hebben wij onlangs dit vrijstaande woonhuis in de verkoop gekregen. De woning is gelegen op maar liefst 570 m2 eigen grond en heeft een rondom gelegen prachtig aangelegde tuin met diverse terrassen waarvan een aan het water is gelegen. Genoeg over het buitenleven, je bent vast nieuwsgierig naar wat het binnenshuis voor jou in petto heeft!",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1067 TV",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 7,
          image: "https://api.intern.d-tt.nl/uploads/house6.jpg",
          price: 645000,
          rooms: {
            bedrooms: 3,
            bathrooms: 1,
          },
          size: 95,
          description:
            "Midden in het centrum van Amsterdam ligt, met uitzicht op het Oosterdok en het Centraal Stationsgebied, dit monumentale appartementencomplex, OP EIGEN GROND!",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1012 AE",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 8,
          image: "https://api.intern.d-tt.nl/uploads/house7.jpg",
          price: 1175000,
          rooms: {
            bedrooms: 4,
            bathrooms: 3,
          },
          size: 185,
          description:
            "Thans mogen we aanbieden, een riante benedenwoning op EIGEN GROND met een wel zeer royale woonkamer! Een parel met vrij uitzicht over het achterliggende Amsterdamse Bos.",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1081 JP",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 9,
          image: "https://api.intern.d-tt.nl/uploads/house8.jpg",
          price: 1300000,
          rooms: {
            bedrooms: 3,
            bathrooms: 1,
          },
          size: 116,
          description:
            "Op de derde en vierde (bovenste) etages van een historisch grachtenpand in het hart van de Jordaan, vindt u deze unieke en zeer ruime designwoning van 116 m2 met open karakter, twee grote slaapkamers en een balkon aan de achterzijde met uitkijk op de Westertoren. De woning kent een bijzonder luxe afwerking en is volledig onder interieur architectuur gerealiseerd in 2016. De woning is per direct bewoonbaar en wordt opgeleverd “as is” (rekeninghoudend met de roerende zakenlijst).",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1016 TS",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 10,
          image: "https://api.intern.d-tt.nl/uploads/house9.jpg",
          price: 475000,
          rooms: {
            bedrooms: 4,
            bathrooms: 1,
          },
          size: 89,
          description:
            "Op een werkelijk fenomenale plek midden in het centrum van Amsterdam ligt dit sfeervolle en lichte dubbele bovenhuis met 3 slaapkamers en een woonoppervlakte van bijna 90 m². Het appartement bevindt zich op eigen grond op de 6e en 7e (bovenste) etages van een traditioneel wijnpakhuis gelegen aan het rustige gedeelte van de Spuistraat.",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1012 TS",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 11,
          image: "https://api.intern.d-tt.nl/uploads/house10.jpg",
          price: 500000,
          rooms: {
            bedrooms: 3,
            bathrooms: 1,
          },
          size: 97,
          description:
            "De woning is gelegen in een Rijksmonument aan het begin van de Spuistraat net om de hoek bij het oude Kattegat en de Koepelkerk. De ligging van het pand is ideaal. Op loopafstand van het Centraal Station maar ook van o.a. de Kalverstraat en Nieuwendijk met een diversiteit aan winkels. En om de hoek treft u een supermarkt waar u terecht kunt voor de dagelijkse boodschappen.",
          location: {
            street: "Oud Heinstraat",
            houseNumber: 23,
            houseNumberAddition: "",
            city: "Amsterdam",
            zip: "1012 TS",
          },
          createdAt: "2020-05-07",
          constructionYear: 2020,
          hasGarage: false,
          madeByMe: false,
        },
        {
          id: 14603,
          image:
            "https://api.intern.d-tt.nl/uploads/d0d25e560820d20e4462f545ad2bad2c.png",
          price: 1236,
          rooms: {
            bedrooms: 1,
            bathrooms: 1,
          },
          size: 110,
          description: "72 C Raoul Wallenbergstraat",
          location: {
            street: "C Raoul Wallenbergstraat",
            houseNumber: 72,
            houseNumberAddition: "undefined",
            city: "Amsterdam",
            zip: "1102 AX",
          },
          createdAt: "2024-03-03",
          constructionYear: 2000,
          hasGarage: true,
          madeByMe: true,
        },
        {
          id: 14611,
          image:
            "https://api.intern.d-tt.nl/uploads/369854cf044d0e1f3173f3fc002a6fd8.png",
          price: 1236,
          rooms: {
            bedrooms: 1,
            bathrooms: 1,
          },
          size: 65,
          description: "72 C Raoul Wallenbergstraat",
          location: {
            street: "C Raoul Wallenbergstraat",
            houseNumber: 72,
            houseNumberAddition: "undefined",
            city: "Amsterdam",
            zip: "1102 AX",
          },
          createdAt: "2024-03-04",
          constructionYear: 2000,
          hasGarage: true,
          madeByMe: true,
        },
      ]);
    },
  },
};
