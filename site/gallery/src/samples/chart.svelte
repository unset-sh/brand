<script lang="ts">
 import { scaleBand } from 'd3-scale';
 import { BarChart } from 'layerchart';
 import * as Chart from '$lib/registry/ui/chart/index.js';
 const data = [{week:'Week 1',profiles:24,posts:12},{week:'Week 2',profiles:32,posts:19},{week:'Week 3',profiles:28,posts:23},{week:'Week 4',profiles:41,posts:29}];
 const config = {profiles:{label:'Profiles',color:'var(--chart-1)'},posts:{label:'Posts',color:'var(--chart-2)'}} satisfies Chart.ChartConfig;
</script>
<div class="w-full max-w-xl space-y-4">
 <p class="text-sm text-muted-foreground">Example activity · counts per week</p>
 <Chart.Container {config} class="h-64 w-full" aria-label="Grouped bar chart of profiles and posts over four weeks. Exact values are in the table below.">
  <BarChart {data} x="week" xScale={scaleBand().padding(0.3)} axis="x" seriesLayout="group" tooltipContext={false} series={[{key:'profiles',label:'Profiles',color:config.profiles.color},{key:'posts',label:'Posts',color:config.posts.color}]} />
 </Chart.Container>
 <div class="flex flex-wrap gap-4 text-sm" aria-label="Chart legend"><span class="flex items-center gap-2"><span class="size-3 bg-chart-1" aria-hidden="true"></span>Profiles · first bar</span><span class="flex items-center gap-2"><span class="size-3 bg-chart-2" aria-hidden="true"></span>Posts · second bar</span></div>
 <details class="text-sm"><summary class="cursor-pointer">Exact example values</summary><table class="mt-3 w-full text-left"><caption class="sr-only">Activity counts</caption><thead><tr><th scope="col">Week</th><th scope="col">Profiles</th><th scope="col">Posts</th></tr></thead><tbody>{#each data as row}<tr><th scope="row" class="font-normal">{row.week}</th><td>{row.profiles}</td><td>{row.posts}</td></tr>{/each}</tbody></table></details>
</div>
