import * as $ from 'jquery';

function createStatistics(): object {
   let counter: number = 0;
   let isDestroyed: boolean = false;
   const listener = (): number => counter++;
   $(document).on('click', listener);

   return {
      destroy(){
         $(document).off('click', listener);
         isDestroyed = true;
         return 'Statistics destroyed';
      },
      getClicks() {
         if (isDestroyed) return 'Statistics destroyed!';
         return counter;
      }
   };
}

window['statistics'] = createStatistics();