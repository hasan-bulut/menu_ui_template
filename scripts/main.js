import { world, system, ItemStack, ItemLockMode } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";


const form = new ActionFormData();
form.title("Başlık");
form.body("Açıklama");
form.button("Buton1");
form.button("Buton2");
form.button("Buton3");


var mainItem = new ItemStack("minecraft:clock", 1)
mainItem.lockMode = ItemLockMode.slot;
mainItem.setLore(["menü"]);

world.afterEvents.itemUse.subscribe(event => {
    var player = event.source;
    var item = event.itemStack;

    if (areArraysEqual(item.getLore(), mainItem.getLore())) {
        form.show(player).then(data => {
            switch (data.selection) {
                case 0:
                    player.sendMessage("Buton1");
                    break;
                case 1:
                    player.sendMessage("Buton2");
                    break;
                case 2:
                    player.sendMessage("Buton3");
                    break;
            }
        });
    }
})

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        const container = player.getComponent('inventory')?.container;
        container.setItem(0, mainItem);
    });
})

function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}