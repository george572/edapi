<template>
    <button type="submit" :class="{small : size === 'small'}">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name : "BaseButton",
        props: {
            size: {
                type: String,
                default: 'normal'
            }
        }
    }
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";
    button {
        max-width: 320px;
        width: 100%;
        height: 50px;
        background-color: $basebtn;
        font-size: $medium;
        padding: 10px 20px;
        border-radius: $radius;
        outline: none;
        border:none;
        box-shadow: $shadow;
        color:$lightext;
        cursor: pointer;
        font-weight: 600;
        margin-top: 20px;
        transition: all 200ms;
        &:hover {
            background-color: $darkbg;
            color:$darktext;
        }
    }
    .small {
        width: 30%;
    }
</style>