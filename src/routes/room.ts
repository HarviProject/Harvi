import { RestRouter } from './RestRouter';
import { RoomModel, RoomSchema } from '../harvi/models/RoomModel';


export class Room extends RestRouter<RoomSchema>{
        constructor(){
                super(new RoomModel());
        }
}