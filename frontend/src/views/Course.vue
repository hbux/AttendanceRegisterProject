<template>
   <form name="form" @submit.prevent="handleLogin">
        <div class="container-fluid">
           <div class="col-1g-12">
              <div class="row">
             <div class="col-md-4">  
         <form action="" id="manage-course">
         <div class="card">
          <div class ="card-header">
                Course Form
            </div>
            <div class="d-grid gap-2">
                <input type="hidden" name="id">
                <div id ="msg"></div>
                <div class ="form-group d-grid gap-2">
                <label class="control-label">Course</label>
                <input type="text" class="form-control" name ="course">
                
                </div>
                <div class ="form-group d-grid gap-2">
                <label for="floatingInput">Course Description</label>
                <textarea name="description" id="" cols="30" rows="4" class="form-control"></textarea>
                </div>
            </div>

            <div class="card-footer">
						<div class="row">
							<div class="col-md-12">
								<button class="btn btn-sm btn-primary col-sm-3 offset-md-3"> Save</button>
								<button class="btn btn-sm btn-default col-sm-3" type="reset"> Cancel</button>
							</div>
						</div>
					</div>
           
        </div>
         </form>
        </div>
       </div>
        </div>
     </div>
    </form>

 
</template>

<script>
    export default {
        name: "CoursePage"
    }
</script>