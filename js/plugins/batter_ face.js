//=============================================================================

// Simple Battle Status Faces

// by lolaccount

// Last Updated: 2015.11.7

//=============================================================================



/*:

 * @plugindesc v1.00 Draws the actor's face in battle status, with  the goal of

 * not blocking the actor's faces too much.

 *

 * @author lolaccount

 *

 * @help This plugin does not provide plugin commands.

 * You can hide the tp bar for an actor by using <HideBattleStatusTp: 1> and/or

 * hide the mp bar for an actor by using <HideBattleStatusMp: 1>

 * ============================================================================

 * How To Use

 * ============================================================================

 * Plug and play.

 * ============================================================================

 * Terms Of Use

 * ============================================================================

 * Free to use and modify for commercial and noncommercial games, with or

 * without credit, as long as you do not claim the script as your own.

 * Credit is appreciated though.

 */

 

(function() {

// override the difficult itemRect for a window

Window_BattleStatus.prototype.itemRect = function(index) {

    var rect = new Rectangle();

    var maxCols = this.maxCols();

    rect.width = this.itemWidth();

    rect.height = this.itemHeight();

    rect.x = rect.width * index;

    rect.y = 0;

    return rect;

};



Window_BattleStatus.prototype.itemWidth = function() {

// decide the width of each "item," or the space each actor occupies in battle status, by the size of the party

    return Math.floor(((this.width - this.padding * 2 +

                       this.spacing()) / 1 - this.spacing())/$gameParty.battleMembers().length);

};



Window_BattleStatus.prototype.maxCols = function() {

// the maximum amount of columns is the number of members in the party

    return $gameParty.battleMembers().length;

};



Window_BattleStatus.prototype.itemHeight = function() {

// the height of each item is the height of the battle status window minus from padding so it looks nicer

    return Math.floor((this.height - this.padding * 2 +

                       this.spacing()) / 1 - this.spacing());

};





Window_BattleStatus.prototype.drawItem = function(index) {

    // we can get the actor from the index passed to this function

    var actor = $gameParty.battleMembers()[index];            

    // the rectangle w/dimensions from another method designed for text

    var textRect = this.itemRectForText(index);            

    // a general rectangle from another method    

    var otherRect = this.itemRect(index);            

    // variable for deciding where to place state/buff icons, x axis    

    var iconPos;                                            

    // variable for deciding where to place tp bar, y axis

    // we're setting the default here

    var tpBarPos = otherRect.y + (this.lineHeight() * 2);    

    

    // draw the actor's face on the bottom most "layer"

    this.drawActorFace(actor, otherRect.x, otherRect.y);

    // draw the actor's name

    this.drawActorName(actor, textRect.x, textRect.y, 150);

    // draw the actor's hp

    this.drawActorHp(actor, otherRect.x + 144 + 4, otherRect.y + (this.lineHeight() * 0), otherRect.width - 144 - 11);

    // draw the actor's mp if it is not set to be hidden for the actor

    if ($dataActors[actor._actorId].meta.HideBattleStatusMp != 1) {

        this.drawActorMp(actor, otherRect.x + 144 + 4, otherRect.y + (this.lineHeight() * 1), otherRect.width - 144 - 11);

    }

    else {

    // if it was set to be hidden, we should adjust the tp bar y position

    tpBarPos = otherRect.y + (this.lineHeight() * 1);

    }



    // if tp is on, draw the actor's tp

    if ($dataSystem.optDisplayTp) {

        // draw the tp bar if it was not set to be hidden for the actor

        if ($dataActors[actor._actorId].meta.HideBattleStatusTp != 1) {

            this.drawActorTp(actor, otherRect.x + 144 + 4, tpBarPos, otherRect.width - 144 - 11);

        }

    }

    

    // if there are many icons taking up the actor's space in the status, shove the icons to the right

    if ((actor.allIcons().length * Window_Base._iconWidth - 3) > otherRect.width - 144) {

        iconPos = otherRect.x + 1 + (otherRect.width - (actor.allIcons().length * Window_Base._iconWidth) - 3);

    }

    // if there's not too many icons taking up the actor's space in the status, don't shove the icons all the way to the right

    else {

        iconPos = otherRect.x + 144 + 4;

    }

    // draw the icons

    this.drawActorIcons(actor, iconPos, otherRect.y + (this.lineHeight() * 3), otherRect.width);



};



})();