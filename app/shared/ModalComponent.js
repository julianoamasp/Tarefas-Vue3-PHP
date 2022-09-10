export default {
    emits: ['fecharmodal'],
    methods:{
        fecharModal:function(){
            this.$emit('fecharmodal')
        }
    },
    template: `
<div style="z-index: 9;position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;display: flex;justify-content: center;padding-top: 20px;">
    <div @click="fecharModal()" style="position: absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.34);top: 0px;left: 0px;"></div>
    <div style="width: 50%;background-color: rgb(255, 255, 255);z-index: 1;border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 25px 7px;height: max-content;min-height: 200px;display: grid;grid-template-rows: max-content auto max-content;">
        <div style="display: flex;justify-content: space-between;padding: 15px;    border-bottom: 1px solid #e6e6e6;">
            
                <slot name="header" style="font-weight: bold;">
                
                </slot>           
            
        </div>
        <div style="padding: 15px;max-height: 600px;overflow: auto;">
            <slot name="body"></slot>  
        </div>
        <div style="display: flex;justify-content: space-between;padding: 15px;border-top: 1px solid #e6e6e6;">
            <slot name="footer"></slot>  
        </div>
    </div>
</div>
    `
}
