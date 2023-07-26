import time
import json

def read_csv(name):
    with open(name) as file:
        content = file.read().split('\n')
    content = [row.split(",") for row in content]
    return content[:-1]

def schedule():

    arr = []
    structure = ["A1", "A2", "A3", "A4"]
    content = read_csv("Count.csv")
    return_arr = []

    for row in content[1:]:

        time_slot = row.pop(0)
        return_arr.append([])

        columns = {"A1L": int(row[0]), "A1D": int(row[1]), "A2L": int(row[2]), "A2D": int(
            row[3]), "A3L": int(row[4]), "A3D": int(row[5]), "A4L": int(row[6]), "A4D": int(row[7])}
        columns = [(k, v) for k, v in columns.items()]
        columns = [item for item in columns if item[1]]

        loads = [item for item in columns if item[0][2] == "L"]
        loads.sort(key=lambda item: item[1], reverse=True)

        dischargs = [item for item in columns if item[0][2] == "D"]
        dischargs.sort(key=lambda item: item[1], reverse=True)

        columns = loads+dischargs

        while columns:

            if len(columns) >= 2:

                jobs = columns[:2]
                new_jobs = []

                for job in jobs:

                    job += (structure.index(job[0][:2]),)
                    new_jobs.append(job)

                new_jobs.sort(key=lambda item: item[2])

                # print(f"Time Slot {time_slot} : C1 in {new_jobs[0][0]}")
                return_arr[-1].append([1, int(new_jobs[0][0][1]), new_jobs[0][0][2]])

                # print(f"Time Slot {time_slot} : C2 in {new_jobs[1][0]}")
                return_arr[-1].append([2, int(new_jobs[1][0][1]), new_jobs[1][0][2]])

                columns = columns[2:]

                c1 = int(new_jobs[0][0][1])
                c2 = int(new_jobs[1][0][1])

                # time.sleep(1)

            else:

                if c1 != c2:

                    destination = int(columns[0][0][1])-1
                    distance_matrix = read_csv("Distance Matrix.csv")[1:]
                    distances = [("C1", int(distance_matrix[destination][c1])),
                                ("C2", int(distance_matrix[destination][c2]))]
                    distances.sort(key=lambda item: item[1])

                    # print(
                    #     f"Time Slot {time_slot} : {distances[0][0]} in {columns[0][0]}")
                    return_arr[-1].append([int(distances[0][0][1]), int(columns[0][0][1]), columns[0][0][2]])
                    
                    # time.sleep(1)
                    break

                else:

                    if c1-destination-1 < 0:

                        # print(f"Time Slot {time_slot} : C2 in {columns[0][0]}")
                        return_arr[-1].append([2, int(columns[0][0][1]), columns[0][0][2]])
                        
                        # time.sleep(1)
                        break

                    else:

                        # print(f"Time Slot {time_slot} : C1 in {columns[0][0]}")
                        return_arr[-1].append([1, int(columns[0][0][1]), columns[0][0][2]])

                        # time.sleep(1)
                        break

    # print(return_arr[0])
    return return_arr
    # out_file = open("out_file.json", "w")
    # json.dump({"data" : return_arr}, out_file, indent=4)
    # out_file.close()

    # return return_arr

# if __name__ =='__main__' :
#     data = schedule()