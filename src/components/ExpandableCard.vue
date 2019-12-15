<template>
    <div class="card">
        <header class="card-header">
            <div class="card-header-icon">
                <figure class="image is-48x48">
                    <img :src="image" alt='Mod Logo'/>
                </figure>
            </div>
            <p class="card-header-title">{{title}}</p>
            <a href="#" @click="toggleVisibility()" class="card-header-icon" aria-label="more options">
                
                <span class="icon">
                    <i class="fas fa-angle-right" aria-hidden="true" v-if="!visible"></i>
                    <i class="fas fa-angle-down" aria-hidden="true" v-if="visible"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-show="visible">
            <div class="content">
                <p>{{description}}</p>
            </div>
        </div>
        <footer class="card-footer" v-show="visible">
            <a href="#" class="card-footer-item">Uninstall</a>
            <a href="#" class="card-footer-item">Disable</a>
            <a href="#" class="card-footer-item">Information</a>
        </footer>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class ExpandableCard extends Vue {
    @Prop({default: ''})
    image: string | undefined;

    @Prop({default: null})
    title: string | undefined;

    @Prop({default: ''})
    description: string | undefined;

    @Prop({default: false})
    visible: boolean | undefined;

    toggleVisibility() {
        this.visible = !this.visible;
    }
}
</script>