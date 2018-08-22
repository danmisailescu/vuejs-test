<template>
<div class="row flex-row flex-nowrap">       
        <div class="col-12 col-md-2">
            <div class="card card-block">
              <span>{{jobTaskRow.task.name}}</span>          
            </div>
        </div> 
        <div class="col-12 col-md-2" v-for="(hour, index) in hoursBeforeTasksStart" :key="index">
            <div class="card card-block">
                <span>-</span> 
            </div>
        </div>
        <div class="col-12" :class="['col-md-' + (2 * (jobWithStartEnd.endHour - jobWithStartEnd.startHour))]"  v-for="(jobWithStartEnd, index) in jobTaskRow.jobsWithStartEnd" :key="index+10000">
            <div class="card card-block bg-info">
                <span>[{{jobWithStartEnd.job.name}}.{{jobTaskRow.task.id}}]</span>
            </div>
        </div>
        <div class="col-12 col-md-2" v-for="(hour, index) in hoursAfterTasksEnd" :key="index+1000">
            <div class="card card-block">
                <span>-</span> 
            </div>
        </div>   
</div>
</template>

<script>

export default {
    props: {
        jobTaskRow: {
			type: Object,
			required: true,
		},
        hours: {
			type: Array,
			required: true,
		},
    },
    data: function() {
        return {
            hoursBeforeTasksStart: [],
            hoursAfterTasksEnd: [],
            localRow: [],
        };
    },
    computed: {
       
    },
    methods: {
         
    },
    async mounted() {        
        if(!this.jobTaskRow.jobsWithStartEnd.length) {
            this.hoursBeforeTasksStart = this.hours;
            this.hoursAfterTasksEnd = [];
            return;
        } else {
            const firstJob = this.jobTaskRow.jobsWithStartEnd[0];
            this.hoursBeforeTasksStart = this.hours.filter(hour => hour < firstJob.startHour);
            const lastJob = this.jobTaskRow.jobsWithStartEnd[this.jobTaskRow.jobsWithStartEnd.length -1];
            this.hoursAfterTasksEnd = this.hours.filter(hour => hour >= lastJob.endHour);
        }
    }
}
</script>

