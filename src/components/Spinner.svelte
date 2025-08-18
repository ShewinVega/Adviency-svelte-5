<script lang="ts">

interface Props {
    classname?: string;
}

const { classname }: Props = $props();

</script>

<i class="spinner {classname}"></i>

<style>
    .spinner {
        --spinner-size: 1rem;
        --spinner-thickness: 0.15;
        --spinner-color: 127, 127, 255;
        --spinner-speed: 0.4s;
        --spinner-easing: linear;
        --spinner-vertical-offset: -16%;

        --spinner-border-width: calc(var(--spinner-size) * var(--spinner-thickness));
        --spinner-border-color-light: rgba(var(--spinner-color), 0.45);
        --spinner-border-color-dark: rgb(var(--spinner-color));

        display: inline-block;

        box-sizing: border-box;

        width: var(--spinner-size);
        height: var(--spinner-size);

        vertical-align: var(--spinner-vertical-offset);

        border-top: var(--spinner-border-width) solid
        var(--spinner-border-color-light);
        border-right: var(--spinner-border-width) solid
        var(--spinner-border-color-light);
        border-bottom: var(--spinner-border-width) solid
        var(--spinner-border-color-light);
        border-left: var(--spinner-border-width) solid
        var(--spinner-border-color-dark);

        border-radius: 100%;
        animation: spinner-anim var(--spinner-speed) var(--spinner-easing) infinite;
    }

    @keyframes spinner-anim {
        from {
        transform: rotate(0deg);
        }

        to {
        transform: rotate(360deg);
        }
    }
</style>
