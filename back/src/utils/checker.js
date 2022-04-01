import { UserModel } from "../db/schemas/user";
import { Education, Award, Project, Certificate, About, Other } from "../db";


function checkPieceWord(pieceword, List) {
    return List.join("____").includes(pieceword);
}  //* TF 리턴.

const mvps = [Education, Award, Project, Certificate, About, Other];
//=============================================================

class Checker {
    static async checkChild({ user_id }) {
        return mvps.map(async Model => {
            await Model.find({ user_id });
        });
    }   //! 어디쓰면 좋을까? 추후 기능업데이트를 할 때 넣으면 좋긴 하겠지..?.. 쓰지는 않지만 잘 작동하고 만들어졌기에 남김.

    static async deleteChild({ user_id }) {
        mvps.map(async Model => {
            await Model.removeAllByUserId({ user_id });
        });
        return "사용자가 쓴 모든 게시글이 삭제되었습니다.";
    }  //* 각 mvp에 있는 user_id를 가진 모든 게시글을 삭제하는 기능.. 완성.

    static async findAllAndFilteredByCondition(pieceword, Model) {
        const userList = await UserModel.find(); //* user를 그대로 받는 이유는 추후 filter에 그대로 리턴을 하기 위함.. true인 것만 반환.
        //! const modelTitle = []; 여기에 빼면 안되는 이유는 push한 값이 그대로 쌓이기 때문에 리셋이 안됨..
        let filteredUserList;

        if (Model === "education") {
            const model = Education;
            filteredUserList = userList.filter(async user => {  //*유저별 구분을 위해 filter 사용.
                const modelTitle = [];
                await model.findByUserId({ user_id: user.id })  //* user의 아이디를 가진 모델을 불러옴. 
                    .map(data => modelTitle.push(data.title));  //* modelTitle에 넣은 후,
                return checkPieceWord(pieceword, modelTitle);  //* 여기에 pieceword가 들어가있을 경우 True를 리턴하게 함으로써 필터를 만듦.
            });
        } else if (Model === 'award') {
            const model = Award;
            filteredUserList = userList.filter(async user => {
                const modelTitle = [];
                await model.findByUserId({ user_id: user.id }) 
                    .map(data => modelTitle.push(data.title));
                return checkPieceWord(pieceword, modelTitle);
            });
        } else if (Model === 'project') {
            const model = Project;
            filteredUserList = userList.filter(async user => {
                const modelTitle = [];
                await model.findByUserId({ user_id: user.id })
                    .map(data => modelTitle.push(data.title));
                return checkPieceWord(pieceword, modelTitle);
            });
        } else if (Model === 'certificate') {
            const model = Certificate;
            filteredUserList = userList.filter(async user => {
                const modelTitle = [];
                await model.findByUserId({ user_id: user.id })
                    .map(data => modelTitle.push(data.title));
                return checkPieceWord(pieceword, modelTitle);
            });
        } else if (Model === 'about') {
            const model = About;
            filteredUserList = userList.filter(async user => {
                const modelTitle = [];
                await model.findByUserId({ user_id: user.id })
                    .map(data => modelTitle.push(data.title));
                return checkPieceWord(pieceword, modelTitle);
            });
        } else if (Model === 'other') {
            const model = Other;
            filteredUserList = userList.filter(async (user) => { 
                const modelTitle = [];
                (await model.findByUserId({ user_id: user.id }))
                    .map(data => modelTitle.push(data.title));

                console.log(checkPieceWord(pieceword, modelTitle));  //done... 
                return await checkPieceWord(pieceword, modelTitle);  
                // //? WANTED : TF를 반환해주는 checkPieceWord를 통해 filter로 걸러진 유저만 pick.. but,
                // //! TF로 return까지 잘 되었는데 왜 filter가 안먹히는걸까..?.. ==> typed.. 읽어보고 바꿔주기 + 함수로 묶어서 적용할 것!!!
                //return false; 
            });
        } 
        return filteredUserList;
    }
    //TODO : 검색기능 구현.
}

export { Checker };