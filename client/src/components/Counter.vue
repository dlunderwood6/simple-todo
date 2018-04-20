<template>
    <div>
        <h2>You have {{totalNumber}} tasks</h2>
    </div>
</template>

<script>
export default {
    props: {
        totalNumber: {
            type: Number,
            default: 22
        }
    }
}
</script>
