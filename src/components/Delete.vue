<template>
 <div class="delete-page">
    <div class="delete-page-layout">
        <div class="delete-content">
             <h2>Delete listing</h2>
              <p class="body-text">Are you sure you want to delete this listing? This action cannot be undone.</p>
              <div class="options">
                    <button class="choose-to-delete" 
                    @click.stop="deleteListing()">
                    YES, DELETE
                    </button>
                    <button class="choose-to-delete" 
                    @click.stop="$emit('close')">
                    GO BACK
                    </button>
                </div>
             

        </div>
 </div> 
    </div>
       
</template>
<script>
  import housingApiService from '../services/HousingApiServices'


export default {
  props: {
    houseId: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    deleteListing() {
        let deleteResposne =  housingApiService.deleteHouse(this.houseId);
    //   window.alert("deleting house id" + deleteResposne.status);
    this.$router.replace('/houses');

      this.$emit('close');

    }
  }
};
</script>

<style scoped>
    @import './assets/styles/styles.css';
    .delete-page{

       margin-top:80px;
        display:flex;
        align-items:center;
        justify-content:center; 
 
        position: fixed; /* Overlay should be fixed */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .delete-page-layout{
         height:400px;
        width:700px;
        border:none;
        border-radius:10px;
        display:flex;
        align-items:center;
        justify-content:center; 
        /* background-color:rgb(11, 173, 54); */


        max-width: 90%; /* Responsive max-width */
        width: 700px; /* Fixed width for larger screens */
        max-height: 90%; /* Responsive max-height */
        height: 400px; /* Fixed height for larger screens */
        background-color: #fff; /* Background for the modal */
        border-radius: 10px; /* Rounded corners */
        padding: 20px; /* Padding inside the modal */
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Shadow for modal */
        display: flex;
        flex-direction: column;
 
    }
    .delete-content {
  /* Styles for the modal box */
  /* background-color: #fff; */
width:400px;
height:300px;

  border-radius: 5px;
  text-align: center;
}

.options{
    display:flex;
    align-items:center;
        justify-content:center;
    flex-direction:column;
    /* margin-top:40px; */

    margin-top: auto;
   
}
.choose-to-delete{
    height:50px;
    width:100%;
    margin-top:20px;
    border-radius:10px;
    border:none;
    color:white;
    background-color: rgb(74,75,76);
}
.choose-to-delete:hover{

background-color: rgb(235,84,64); 

}

/* .choose-to-delete.active, .choose-to-delete.active {

background-color: rgb(235,84,64); 

} */



/* .modal {

  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 500;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
} */




</style>