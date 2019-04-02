import { apiurl, fetch } from "@/util/auth";

export async function fetchRuns(group, lastrun) {
    let u = apiurl("/runs");
    if (group) {
        u.searchParams.append("group", group)
    }
    if (lastrun) {
        u.searchParams.append("lastrun", true)
    }
    let res = await fetch(u)
    return res.json();
}

export async function fetchRun(runid) {
    let res = await fetch(apiurl("/run/" + runid));
    return res.json();
}

export async function fetchTask(runid, taskid) {
    let res = await fetch(apiurl("/run/" + runid + "/task/" + taskid))
    return res.json();
}

export async function fetchProject(ref) {
    let path = "/projects/" + encodeURIComponent(ref)

    let res = await fetch(apiurl(path));
    return res.json();
}

export async function fetchVariables(ownertype, ref, all) {
    let path
    if (ownertype == "project") {
        path = "/projects/"
    } else if (ownertype == "projectgroup") {
        path = "/projectgroups/"
    }
    path += encodeURIComponent(ref);
    path += "/variables";
    if (all) {
        path += "?tree&removeoverridden";
    }
    let res = await fetch(apiurl(path));
    return res.json();
}