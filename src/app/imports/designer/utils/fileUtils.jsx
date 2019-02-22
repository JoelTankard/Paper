import _ from 'lodash';

//Updates object
export const updateObject = (file, objectId, objectData) => {
    let clonedFile = _.clone(file);
    //find object and merge new data
    clonedFile.objects = _.forEach(clonedFile.objects, (object, index) => {
        if(object.id === objectId){
            _.merge(object, objectData)
        }
    });
    return clonedFile;
}