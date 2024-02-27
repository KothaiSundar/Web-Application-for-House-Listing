<template>
 <div class="delete-page">
    <div class="delete-page-layout">
        <div class="delete-content">
             <h2>Delete listing</h2>
              <p class="body-text">Are you sure you want to delete this listing? This action cannot be undone.</p>
              <div class="options">
                    <button class="choose-to-delete" 
                    @click.stop="deleteListing(house.id)">
                    YES, DELETE
                    </button>
                    <button class="choose-to-delete" 
                    @click.stop="showModal = false">
                    GO BACK
                    </button>
                </div>
             

        </div>
 </div> 
    </div>
       
</template>


<style scoped>
    @import './assets/styles/styles.css';
    .delete-page{

       margin-top:80px;
        display:flex;
        align-items:center;
        justify-content:center;
 
    }
    .delete-page-layout{
        height:400px;
        width:700px;
        /* background-color:rgb(11, 173, 54); */
        border:none;
        border-radius:10px;
        display:flex;
        align-items:center;
        justify-content:center;
 
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
    margin-top:40px;
   
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