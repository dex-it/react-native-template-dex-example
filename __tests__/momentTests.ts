/// <reference types="jest" />

import moment from "moment";

test("moment parse test", () => {
    const str = "10:11";
    const date = moment(str, "HH:mm");

    expect(date.hour()).toBe(10);
    expect(date.minute()).toBe(11);
});

test("create date test", () => {
    const date = new Date(2017, 11, 20);

    expect(date.toISOString()).toBe("2017-12-19T22:00:00.000Z");
});

test("create from undefined", () => {
    const moment1 = moment();
    const moment2 = moment(undefined);

    expect(moment1.diff(moment2, "seconds")).toBe(0);
});

test("diff test", () => {
    const date = moment("21.12.1992", "DD.MM.YYYY");
    const now = moment();

    const diff = now.diff(date, "years");

    expect(diff).toBe(25);
});