const fs = require('fs');
const _ = require('lodash');
const rimraf = require('rimraf');
const path = require('path');

const APP_DIR = path.dirname('App');
const LOGS_FOLDER = `${APP_DIR}/logs/user-activity`;

console.log(path.dirname('App'));

function createLogDirectory() {
  return new Promise((res, rej) => {
    fs.mkdir(LOGS_FOLDER, { recursive: true }, err => {
      if (err) rej(err);
      res(LOGS_FOLDER);
    });
  });
}

function removeLogDirectory() {
  return new Promise((res, rej) => {
    rimraf(LOGS_FOLDER, err => {
      if (err) rej(err);
      res(LOGS_FOLDER);
    });
  });
}

function removeFile(fileName) {
  return new Promise((res, rej) => {
    console.log(`${LOGS_FOLDER}/${fileName}.json`);
    fs.unlink(`${LOGS_FOLDER}/${fileName}.json`, err => {
      if (err) rej(err);
      res(`removed ${fileName}`);
    });
  });
}

function createJsonFile(fileName, obj) {
  return new Promise((res, rej) => {
    fs.writeFile(
      `${LOGS_FOLDER}/${fileName}.json`,
      JSON.stringify(obj, null, 2),
      'utf8',
      err => {
        if (err) rej(err);
        res(`Create ${fileName}.`);
      }
    );
  });
}

function userInputToStartCase(newUser) {
  newUser.name = newUser.name;
  newUser.email = _.toLower(newUser.email);
  if (newUser.address)
    newUser.address.city = _.startCase(_.toLower(newUser.address.city));
  else newUser.city = _.startCase(_.toLower(newUser.city));
}

function readJsonFile(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(`${LOGS_FOLDER}/${fileName}.json`, 'utf8', (err, jsonObj) => {
      if (err) rej(err);
      const obj = JSON.parse(jsonObj);
      res(obj);
    });
  });
}

async function readUserFile(userId, userName) {
  const userFile = await readJsonFile(`${userId}-${userName}`);
  const { changeLog } = userFile;
  const { data } = changeLog[changeLog.length - 1];
  return { userFile, changeLog, data };
}

async function updateUserFile(userFile, changeLog, newData) {
  changeLog.push(newData);
  await createJsonFile(
    `${newData.data.user.id}-${newData.data.user.name}`,
    userFile
  );
}

// POST - USER
function createJsonFileForUser(user) {
  userInputToStartCase(user);
  createJsonFile(`${user.id}-${user.name}`, createObjectFileStructure(user));
}
// PUT - USER
async function updateUserFileProperties(userId, userName, reqBody) {
  userInputToStartCase(reqBody);
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = updateUserProperties(data, reqBody, userId);
  updateUserFile(userFile, changeLog, newData);
}

// POST - PHONE
async function createUserFilePhone(userId, userName, newPhone) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = insertNewPhone(data, newPhone);
  updateUserFile(userFile, changeLog, newData);
}

// POST - TASK
async function createUserFileTask(userId, userName, newTask) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = insertNewTask(data, newTask);
  updateUserFile(userFile, changeLog, newData);
}

// POST - POST
async function createUserFilePost(userId, userName, newPost) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = insertNewPost(data, newPost);
  updateUserFile(userFile, changeLog, newData);
}

// DELETE - TASK
async function deleteUserFileTask(userId, userName, taskId) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = deleteTask(data, taskId);
  updateUserFile(userFile, changeLog, newData);
}

// DELETE - POST
async function deleteUserFilePost(userId, userName, postId) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = deletePost(data, postId);
  updateUserFile(userFile, changeLog, newData);
}

// PUT - TASK
async function updateUserFileTasks(userId, userName, taskId, updatedTaskProps) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = updateTask(data, taskId, updatedTaskProps);
  updateUserFile(userFile, changeLog, newData);
}

// PUT - POST
async function updateUserFilePosts(userId, userName, postId, updatedPostProps) {
  const { userFile, changeLog, data } = await readUserFile(userId, userName);
  const newData = updatePost(data, postId, updatedPostProps);
  updateUserFile(userFile, changeLog, newData);
}

function createObjectFileStructure(user) {
  return { changeLog: [{ data: { user, tasks: [], posts: [] } }] };
}

function updateUserProperties(data, reqBody, userId) {
  const newData = {
    data: {
      ...data,
      user: {
        ...data.user,
        name: reqBody.name,
        email: reqBody.email,
        address: { ...data.user.address, city: reqBody.city }
      }
    },
    originalData: {},
    newData: {}
  };

  if (data.user.name !== reqBody.name) {
    newData.originalData.name = data.user.name;
    newData.newData.name = reqBody.name;
    removeFile(`${userId}-${data.user.name}`);
  }
  if (data.user.email !== reqBody.email) {
    newData.originalData.email = data.user.email;
    newData.newData.email = reqBody.email;
  }
  if (data.user.address.city !== reqBody.city) {
    newData.originalData.address = { city: data.user.address.city };
    newData.newData.address = { city: reqBody.city };
  }
  return newData;
}

function insertNewPhone(data, newPhone) {
  return {
    data: {
      ...data,
      user: { ...data.user, phones: [...data.user.phones, newPhone] }
    },
    originalData: { phones: data.user.phones },
    newData: { phones: [newPhone] }
  };
}

function insertNewTask(data, newTask) {
  return {
    data: {
      ...data,
      tasks: [...data.tasks, newTask]
    },
    originalData: { tasks: [...data.tasks] },
    newData: { tasks: [newTask] }
  };
}

function insertNewPost(data, newPost) {
  return {
    data: {
      ...data,
      posts: [...data.posts, newPost]
    },
    originalData: { posts: [...data.posts] },
    newData: { posts: [newPost] }
  };
}

function deleteTask(data, taskId) {
  taskId = parseInt(taskId);
  const updatedTasks = data.tasks.filter(task => task.id !== taskId);
  return {
    data: {
      ...data,
      tasks: [...updatedTasks]
    },
    originalData: { tasks: [...data.tasks] },
    newData: { tasks: [...updatedTasks] }
  };
}

function deletePost(data, postId) {
  postId = parseInt(postId);
  const updatedPosts = data.posts.filter(post => post.id !== postId);
  return {
    data: {
      ...data,
      posts: [...updatedPosts]
    },
    originalData: { posts: [...data.posts] },
    newData: { posts: [...updatedPosts] }
  };
}

function updateTask(data, taskId, updatedTaskProps) {
  taskId = parseInt(taskId);
  const taskIndex = _.findIndex(data.tasks, task => {
    return task.id === taskId;
  });
  const updatedTaskArr = [...data.tasks];
  updatedTaskArr[taskIndex] = {
    ...data.tasks[taskIndex],
    ...updatedTaskProps
  };

  return {
    data: {
      ...data,
      tasks: updatedTaskArr
    },
    originalData: { tasks: [data.tasks[taskIndex]] },
    newData: { tasks: [updatedTaskArr[taskIndex]] }
  };
}

function updatePost(data, postId, updatedPostProps) {
  postId = parseInt(postId);
  const postIndex = _.findIndex(data.posts, post => {
    return post.id === postId;
  });
  const updatedPostArr = [...data.posts];
  updatedPostArr[postIndex] = {
    ...data.posts[postIndex],
    ...updatedPostProps
  };

  return {
    data: {
      ...data,
      posts: updatedPostArr
    },
    originalData: { posts: [data.posts[postIndex]] },
    newData: { posts: [updatedPostArr[postIndex]] }
  };
}

module.exports = {
  APP_DIR,
  createJsonFile,
  removeFile,
  createLogDirectory,
  removeLogDirectory,
  createObjectFileStructure,
  // users
  createJsonFileForUser,
  updateUserFileProperties,
  createUserFilePhone,
  // tasks
  createUserFileTask,
  deleteUserFileTask,
  updateUserFileTasks,
  // posts
  updateUserFilePosts,
  createUserFilePost,
  deleteUserFilePost
};
