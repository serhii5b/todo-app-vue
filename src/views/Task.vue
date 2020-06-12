<template>
  <div class="row">
  	<div v-if="task" class="col s6 offset-s3">
  		<h1>{{task.title}}</h1>

		<form @submit.prevent="submitHandler">
  			
        	<div class="chips" ref="chips"></div>

        	<div class="input-field">
	            <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
	            <label for="description">Description</label>
	            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
          	</div>

          	  <input type="text" ref="datepicker">

          	  <div v-if="task.status !== 'complited'">
          	  	<button class="btn" type="submit">Update tast</button>
          	  	<button @click="compliteTask" class="btn blue" type="button" style="margin-left: 1rem;">Complite tast</button>
          	  </div>
  		</form>

  	</div>
  	<p v-else>Task not found</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  computed: {
  	task() {
  		return this.$store.getters.taskById(+this.$route.params.id)
  	}
  },
  name: 'create',
  data(){
  	return {
  		description: '',
  		chips: null,
  		date: null
  	}
  },
  mounted(){
  	this.description = this.task.description;
  	this.chips = M.Chips.init(this.$refs.chips, {
  		placeholder: 'Task tags',
  		data: this.task.tags
  	});
  	this.date = M.Datepicker.init(this.$refs.datepicker, {
  		format: 'dd.mm.yyyy',
  		defaultDate: new Date(this.task.date),
  		setDefaultDate: true
  	});
  	setTimeout(() => {
  		M.updateTextFields()
  	}, 0);
  },
  methods: {
  	submitHandler(){
  		const task = {
  			id: this.task.id,
  			description: this.description,
  			date: this.date.date
  		}
  		
  		this.$store.dispatch('updateTask', task);
  		//Перейти на сторінку із списком задач
  		this.$router.push('/list');
  	},
  	compliteTask(){
  		this.$store.dispatch('compliteTask', this.task.id);
  		this.$router.push('/list');
  	}
  },
  destroyed(){
  	if (this.date && this.date.destroy) {
  		this.date.destroy();
  	}
  	if (this.chips && this.chips.destroy) {
  		this.chips.destroy();
  	}
  }
}
</script>

<style lang="scss" scoped>
	#description{
		min-height: 200px;
	}
</style>