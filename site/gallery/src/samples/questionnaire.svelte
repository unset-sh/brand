<script lang="ts">
 import * as Questionnaire from '$lib/registry/ui/questionnaire/index.js';
 const items=[{name:'surface',required:true,choices:[{value:'app'},{value:'docs'},{value:'renderer'}]},{name:'density',required:true,choices:[{value:'comfortable'},{value:'compact'}]}] as const;
 let result=$state('');
 function submit(event:SubmitEvent){event.preventDefault();const data=new FormData(event.currentTarget as HTMLFormElement);result=`Saved locally: ${data.get('surface')}, ${data.get('density')}.`;}
</script>
<div class="w-full max-w-lg">
 <Questionnaire.Root {items} defaultItem="surface" shortcuts="letters" onSubmit={submit}>
  <Questionnaire.Progress/>
  <Questionnaire.Item name="surface" required><Questionnaire.Title>Where will you use the system?</Questionnaire.Title><Questionnaire.Description>Choose a surface for this example.</Questionnaire.Description><Questionnaire.Choices><Questionnaire.Choice value="app">Application</Questionnaire.Choice><Questionnaire.Choice value="docs">Documentation</Questionnaire.Choice><Questionnaire.Choice value="renderer">Profile renderer</Questionnaire.Choice></Questionnaire.Choices><Questionnaire.Error/></Questionnaire.Item>
  <Questionnaire.Item name="density" required><Questionnaire.Title>How much room should controls have?</Questionnaire.Title><Questionnaire.Description>We can apply the same palette at either density.</Questionnaire.Description><Questionnaire.Choices><Questionnaire.Choice value="comfortable">Comfortable</Questionnaire.Choice><Questionnaire.Choice value="compact">Compact</Questionnaire.Choice></Questionnaire.Choices><Questionnaire.Error/></Questionnaire.Item>
  <Questionnaire.Actions><Questionnaire.Previous/><Questionnaire.Next>Next</Questionnaire.Next><Questionnaire.Submit>Save example</Questionnaire.Submit></Questionnaire.Actions>
 </Questionnaire.Root>
 <p class="mt-4 text-sm" role="status">{result}</p>
</div>
