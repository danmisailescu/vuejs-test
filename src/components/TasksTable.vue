<template>
<div class="container-fluid">
    <h3>Tasks per hour</h3>
    <div class="row flex-row flex-nowrap">
        <div class="col-12 col-md-2">
          
        </div> 
        <div class="col-12 col-md-2" v-for="hour in hours" :key="hour">
            <div class="card card-block">
              <span v-if="hour < 10">0{{hour}}:00</span>
              <span v-else>{{hour}}:00</span>              
            </div>
        </div>            
    </div>
    <job-task-row v-for="(jobTaskRow, index) in jobTaskRows" :key="index"
        :job-task-row = "jobTaskRow"
        :hours = "hours" />
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
//import { arrayGetElementWithValue } from '../commonLogic';
import JobTaskRow from './JobTaskRow';

export default {
    components: {
        JobTaskRow,
    },
    data: function() {
        return {
            jobTaskRows: []
        };
    },
    computed: {
        ...mapGetters([
            'hours',
            'tasks',
            'jobs'			
        ]),
    },
    methods: {
         ...mapActions([
            'getTasks',	
            'getJobs',		
        ]),
        buildJobTaskRows() {
            //this data structure should come from the server via an API call
            let startHour = this.hours[0];
            const jobTaskRows = [];            
            this.tasks.forEach(task => {
                //let startHour = null;
                const jobsWithStartEnd = [];                
                const jobTaskRow = {                   
                    task,
                    jobsWithStartEnd,
                };
                this.jobs.forEach(job => {
                    job.orderedTaskIds.forEach((taskId) => {
                        if(taskId === task.id) {
                            /* if(startHour === null) {
                                if (!jobTaskRows.length) {
                                    startHour = this.hours[0];
                                } else if(index === 0) {
                                    startHour = this.hours[0];
                                } else {
                                    let previousTaskId = null;
                                    for(let i = jobTaskRows.length-1; i>=0; i--) {
                                        const jobTaskRow = jobTaskRows[i];
                                        for (let j = 0; i < jobTaskRow.jobsWithStartEnd.length; j++) {
                                            const jobWithStartEnd = jobTaskRow.jobsWithStartEnd[j];
                                            previousTaskId = arrayGetElementWithValue(jobWithStartEnd.job.orderedTaskIds, job.orderedTaskIds[index-1]);
                                            if (previousTaskId) {
                                                startHour = jobWithStartEnd.endHour; 
                                                break;                                               
                                            }
                                        }
                                        
                                        if (previousTaskId) {
                                           break;
                                        }                                        
                                    }
                                   
                                    if (!previousTaskId) {
                                        startHour = this.hours[0];
                                    }                              
                                }
                            }*/
                            const endHour = startHour + task.durationInHours;
                            jobsWithStartEnd.push({
                                job,
                                startHour,
                                endHour,
                            });
                            startHour = endHour;
                        }
                    });                    
                });
                jobTaskRows.push(jobTaskRow);              
            });
            this.jobTaskRows = jobTaskRows;
        }
    },
    async mounted() {
        await this.getTasks();
        await this.getJobs();
        this.buildJobTaskRows();
    }
}
</script>

