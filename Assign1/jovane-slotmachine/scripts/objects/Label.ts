/** 
 * Author:      Jovane Marques - 300982100
 * Create at:   Feb 05th, 2020
 * Description: Label Component
 * 
 * Revisions:   Feb 05th, 2020 - Creation
*/
module objects {
    export class Label extends createjs.Text {

        /**
         * Creates an instance of Label.
         *
         * @param {string} [labelString="empty label"]
         * @param {string} [fontSize="12px"]
         * @param {string} [fontFamily="Consolas"]
         * @param {string} [fontColour="#000000"]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [isCentered=false]
         * @memberof Label
         */
        constructor(public labelString: string = "empty label", public fontSize: string = "30px", public fontFamily: string = "Homemade Apple", public fontColour: string = "white", x: number = 0, y: number = 0, public isCentered: boolean = false) {
            super(labelString, fontSize + " " + fontFamily, fontColour);

            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }

            this.x = x;
            this.y = y;
        }
        //methods
    }
}