module objects{
    export abstract class Scene extends createjs.Container{

        constructor(){
            super();
            this.Start();
        }
        // Life cycle functions
        /**
         * Initialization Method
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Start():void;
        /**
         * Update all game objects attached to the scene
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Update():void;
        /**
         * 
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Main():void;
    }
}