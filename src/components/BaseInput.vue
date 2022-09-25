<template>
    <label>
        <span><slot></slot></span>
        <input @input="emitInputText" :value="content" :type="type" :placeholder="placeholder"/>
    </label>
</template>

<script>
export default {
    name: "BaseInput",
    props: {
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        model: String,
        value: String,
    },
    data() {
        return {
            content: this.value
        }
    },
    methods : {
        emitInputText() {
            this.$emit('inputChange', this.content)
        }
    }
}
</script>

<style scoped lang="scss">

</style>