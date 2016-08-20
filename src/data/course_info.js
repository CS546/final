const mongoCollections = require("../config/mongoCollections");
const courses = mongoCollections.courses;
const users = mongoCollections.users;
//const scheduler = require("/scheduler");
const uuid = require('node-uuid');
let getData = () => {
    return Promise.resolve("Data");
}

let exportedMethods = {
    getData: getData,
    getCourseById(id) {
    	return courses().then((coursesCol) => {
    		return coursesCol.findOne({_id: id}).then((foundCourse) => {
    			if(!foundCourse) throw "course not found";
    			return foundCourse;
    		});
    	});
    },

    addCourse(name, dept, num, call, min_cred, max_cred, max_enroll, curr_enroll, status, start_date, end_date, instructor, term, meetings, requirements) {
    	return courses().then((courseCol) => {
    		let newCourse = {
    			_id: uuid.v4(),
	    		name: name,
	    		dept: dept,
	    		call: call,
	    		min_cred: min_cred,
	    		max_cred: max_cred,
	    		max_enroll: max_enroll,
	    		curr_enroll: curr_enroll,
	    		status: status,
	    		start_date: start_date,
	    		end_date: end_date,
	    		instructor: instructor,
	    		term: term,
	    		meetings: meetings,
	    		requirements: requirements
	    	};

    		return courseCol.insertOne(newCourse).then((newCourseInfo) => {
    			return newCourseInfo.insertedId;
    		}).then((newId) => {
    			return this.getCourseById(newId);
    		});
    	});
    },

    addUser(name, major, cwid, password, gpa, semester_of_entry, d_o_g, current_credit_total, schedules) {
    	return users().then((userCol) => {
    		let newUser = {
    			_id: uuid.v4(),
    			name: name,
    			major: major,
    			cwid: cwid,
    			password: password,
    			gpa: gpa,
    			semester_of_entry: semester_of_entry,
    			d_o_g: d_o_g,
    			current_credit_total: current_credit_total,
    			schedules: schedules
    		};

    		return userCol.insertOne(newUser).then((newUserInfo) => {
    			return newUserInfo.insertedId;
    		}).then((newId) => {
    			return this.getUserById(newId);
    		});
    	});
    },
    getUserById(id)  {
    	return users().then((usersCol) => {
    		return usersCol.findOne({_id: id}).then((foundUser) => {
    			if(!foundUser) throw "User not found";
    			return foundUser;
    		});
    	});
    },

    getUserByName(name) {
        return users().then((userCol) => {
            return userCol.findOne({ name: name }).then((foundUser) => {
                if (!foundUser) throw "User not found";
                console.log(foundUser);
                return foundUser;
            });
        });
    },

    removeUser(user)  {
    	return users().then((userCol) => {
    		return usersCol.removeOne({_id: user._id}).then((deletionInfo) => {
    			if(deletionInfo.deletedCount === 0) {
    				throw("Could not delete user");
    			}
    			else
    			{

    			}
    		});
    	});
    },
    removeCourse(course)  {
    	return courses().then((courseCol) => {
    		return coursesCol.removeOne({_id: course._id}).then((deletionInfo) => {
    			if(deletionInfo.deletedCount === 0) {
    				throw("Could not delete course");
    			}
    			else
    			{

    			}
    		});
    	});
    },
    updateCourse(id, updatedCourse) {
    	return courses().then((courseCol) => {
    		let updatedCourseData = {};

    		if(updatedCourse.name) {
    			updatedCourseData.name = updatedCourse.name;
    		}
    		if(updatedCourse.dept) {
    			updatedCourseData.dept = updatedCourse.dept;
    		}
    		if(updatedCourse.num) {
    			updatedCourseData.num = updatedCourse.num;
    		}
    		if(updatedCourse.call) {
    			updatedCourseData.call = updatedCourse.call;
    		}
    		if(updatedCourse.min_credits) {
    			updatedCourseData.min_credits = updatedCourse.min_credits;
    		}
    		if(updatedCourse.max_credits) {
    			updatedCourseData.max_credits = updatedCourse.max_credits;
    		}
    		if(updatedCourse.max_enrollment) {
    			updatedCourseData.max_enrollment = updatedCourse.max_enrollment;
    		}
    		if(updatedCourse.curr_enrollment) {
    			updatedCourseData.curr_enrollment = updatedCourse.curr_enrollment;
    		}
    		if(updatedCourse.status) {
    			updatedCourseData.status = updatedCourse.status;
    		}
    		if(updatedCourse.start_date) {
    			updatedCourseData.start_date = updatedCourse.start_date;
    		}
    		if(updatedCourse.end_date) {
    			updatedCourseData.end_date = updatedCourse.end_date;
    		}
    		if(updatedCourse.instructor) {
    			updatedCourseData.instructor = updatedCourse.instructor;
    		}
    		if(updatedCourse.term) {
    			updatedCourseData.term = updatedCourse.term;
    		}
    		if(updatedCourse.meetings) {
    			updatedCourseData.meetings = updatedCourse.meetings;
    		}
    		if(updatedCourse.requirements) {
    			updatedCourseData.requirements = updatedCourse.requirements;
    		}

    		let updateCommand = {
    			$set: updatedCourseData
    		};
    		return courseCol.updateOne({_id: id}, updateCommand).then((result) => {
    			return this.getCourseById(id);
    		});
    	});
    },

    updateUser(id, updatedUser) {
    	return users().then((userCol) => {
    		let updatedUserData = {};

    		if(updatedUser.name) {
    			updatedUserData.name = updatedUser.name;
    		}
    		if(updatedUser.major) {
    			updatedUserData.major = updatedUser.major;
    		}
    		if(updatedUser.cwid) {
    			updatedUserData.cwid = updatedUser.cwid;
    		}
    		if(updatedUser.password) {
    			updatedUserData.password = updatedUser.password;
    		}
    		if(updatedUser.gpa) {
    			updatedUserData.gpa = updatedUser.gpa;
    		}
    		if(updatedUser.semester_of_entry) {
    			updatedUserData.semester_of_entry = updatedUser.semester_of_entry;
    		}
    		if(updatedUser.d_o_g) {
    			updatedUserData.d_o_g = updatedUser.d_o_g;
    		}
    		if(updatedUser.current_credit_total) {
    			updatedUserData.current_credit_total = updatedUser.current_credit_total;
    		}
    		if(updatedUser.schedules) {
    			updatedUserData.schedules = updatedUser.schedules;
    		}

    		let updateCommand = {
    			$set: updatedUserData
    		};

    		return userCol.updateOne({_id: id}, updateCommand).then((result) => {
    			return this.getUserById(id);
    		});
    	});
    },

    addSchedule(id, schedule) {
        return users().then((userCol) => {
            return userCol.update({_id: id}, {$addToSet: {"schedules": schedule}}).then((result) => {
                return this.getUserById(id);
            });
        });
    },

    getScheduleByName(userId, schedName) {
        return users().then((userCol) => {
            return userCol.findOne({_id: userId}, {schedules: {$elemMatch: {name: schedName}}}).then((mySched) => {
                if(!mySched) throw "schedule not found";
                return mySched;
            });
        });
    }
}

module.exports = exportedMethods;
