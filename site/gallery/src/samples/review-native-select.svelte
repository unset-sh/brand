<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
</script>

<div class="grid w-full max-w-xs gap-2">
	<Label for="task-status">Status</Label>
<NativeSelect.Root id="task-status" name="status" class="w-full">
	<NativeSelect.Option value="">Select status</NativeSelect.Option>
	<NativeSelect.Option value="todo">Todo</NativeSelect.Option>
	<NativeSelect.Option value="in-progress">In Progress</NativeSelect.Option>
	<NativeSelect.Option value="done">Done</NativeSelect.Option>
	<NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
</NativeSelect.Root>
</div>
