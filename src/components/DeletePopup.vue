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
    async deleteListing() {
      try {
        let deleteResposne = await housingApiService.deleteHouse(this.houseId);
        if (deleteResposne.status !== 200 && deleteResposne.status != 204) {
          throw new Error('Failed to delete ');
        }
        this.$router.replace('/houses');
      }
      catch (error) {
        window.alert('Error deleting house: ' + error.message + ", try after some time!!");
      }
      finally {
        this.$emit('close');
        this.$emit('houseDeleted');
      }
    }
  }
};
</script>

<template>
  <section class="delete-page">
    <div class="delete-page-layout">
      <div class="delete-content">
        <h2>Delete listing</h2>
        <p class="body-text">Are you sure you want to delete this listing? This action cannot be undone.</p>
        <div class="options">
          <button class="choose-to-delete" @click.stop="deleteListing()">
            YES, DELETE
          </button>
          <button class="choose-to-delete" @click.stop="$emit('close')">
            GO BACK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<style>
/*desktop screens */
.delete-page {
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.delete-page-layout {
  width: 700px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  max-height: 90%;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  flex-direction: column;
}

.delete-content {
  width: 400px;
  height: 300px;
  border-radius: 5px;
  text-align: center;
}

.options {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: auto;
}

.choose-to-delete {
  height: 50px;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  color: rgb(255, 255, 255);
  background-color: rgb(74, 75, 76);
}

.choose-to-delete:hover {
  background-color: rgb(235, 84, 64);
}

/* Media query for mobile screens */
@media screen and (max-width: 768px) {
  .delete-page {
    margin-top: 0px;
  }

  .delete-page-layout {
    margin: 0 auto;
    width: 60%;
    height: 30%;

  }

  .delete-content {
    width: 80%;
    height: 80%;

  }

  .choose-to-delete {
    height: 30px;
    width: 60%;
    margin-top: 5px;
    border-radius: 5px;
    border: none;
    font-family: "Montserrat";
    font-size: 12px;
  }

}

@media screen and (max-width: 430px) {
  .delete-page-layout {
    width: 90%;
    height: 30%;

  }

  .delete-content {
    width: 90%;
    height: 80%;

  }
}
</style>