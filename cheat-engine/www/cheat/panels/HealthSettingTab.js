export default {
    name: 'HealthSettingTab',

    template: `
<div>
    <v-data-table
        v-if="tableHeaders"
        dense
        hide-default-footer
        :headers="tableHeaders"
        :items="editingItems">
        <template
            v-slot:item.name="{ item }">
            <span class="caption">{{item.name}}</span>
        </template>
        <template
            v-slot:item.hp="{ item }">
            <v-text-field
                background-color="grey darken-3"
                class="d-inline-flex x-small-field caption"
                style="width: 50px;"
                hide-details
                solo
                :value="item.editHp === undefined ? item.hp.hp : item.editHp"
                label="Curr Hp"
                dense
                @keydown.self.stop
                @input="onHpInput(item, $event)"
                @change="onDataChange"
                @focus="$event.target.select()">
            </v-text-field>
            <span class="caption">/ {{item.hp.mhp}}</span>
        </template>
        <template
            v-slot:item.mp="{ item }">
            <v-text-field
                background-color="grey darken-3"
                class="d-inline-flex x-small-field caption"
                style="width: 50px;"
                hide-details
                solo
                :value="item.editMp === undefined ? item.mp.mp : item.editMp"
                label="Curr Mp"
                dense
                @keydown.self.stop
                @input="onMpInput(item, $event)"
                @change="onDataChange"
                @focus="$event.target.select()">
            </v-text-field>
            <span class="caption">/ {{item.mp.mmp}}</span>
        </template>
    </v-data-table>
</div>
    `,

    data () {
        return {
            tableHeaders: [
                {
                    text: 'Name',
                    value: 'name',
                },
                {
                    text: 'Hp',
                    value: 'hp'
                },
                {
                    text: 'Mp',
                    value: 'mp'
                }
            ],

            editingItems: [],
        }
    },

    props: {
        items: {
            type: Array,
            default: []
        }
    },

    watch: {
        items: {
            immediate: true,
            handler () {
                this.editingItems = this.items.map((member) => {
                    return {
                        _member: member,
                        name: member.name(),
                        hp: {
                            hp: member.hp,
                            mhp: member.mhp,
                        },
                        mp: {
                            mp: member.mp,
                            mmp: member.mmp
                        }
                    }
                })
            }
        }
    },

    methods: {
        onHpInput (item, value) {
            this.$set(item, 'editHp', value)
        },

        onMpInput (item, value) {
            this.$set(item, 'editMp', value)
        },

        onDataChange () {
            for (const item of this.editingItems) {
                if (item.editHp !== undefined) {
                    item.hp.hp = Number(item.editHp)
                    this.$delete(item, 'editHp')
                }
                if (item.editMp !== undefined) {
                    item.mp.mp = Number(item.editMp)
                    this.$delete(item, 'editMp')
                }
            }

            this.$emit('change', this.editingItems)
        }
    }
}
