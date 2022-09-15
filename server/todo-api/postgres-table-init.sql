CREATE TABLE tasks (
	todo_id  serial PRIMARY KEY,
	taskname varchar NOT NULL,
	taskduedate timestamp,
    taskcompleteddate timestamp,
	iscompleted bool NOT NULL DEFAULT false,
);

INSERT INTO tasks (todo_id, taskname, taskduedate) VALUES (1,'testing123','2022-07-23')