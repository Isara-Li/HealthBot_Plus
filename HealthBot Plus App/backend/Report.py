from flask import jsonify
from bson.json_util import dumps
from bson import ObjectId 


def get_Report(request,db):
    report_collection = db["report"] 
    try:
        # Get the userId (doctor_id) from the request body
        data = request.get_json()
        doctor_id = data.get("userId")

        if not doctor_id:
            return jsonify({"error": "Missing userId parameter"}), 400

        # Find all reports with the doctor_id equal to the provided doctor_id
        reports = report_collection.find({"doctor_id": doctor_id})

        # Convert the cursor to a list and use dumps to handle BSON serialization
        reports_list = list(reports)
        reports_json = dumps(reports_list)

        # Return the list of reports as a JSON response
        return jsonify({"reports": reports_json}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def update_report_status(request,db):
    report_collection = db["report"]
    data = request.get_json()
    report_id = data.get("reportId")
    new_status = data.get("status")

    if not report_id or not new_status:
        return jsonify({"error": "Missing parameters"}), 400

    # Update the report status
    object_id = ObjectId(report_id)

        # Update the report status
    result = report_collection.update_one(
        {"_id": object_id},  # Use the ObjectId here
        {"$set": {"status": new_status}}
    )

    if result.matched_count > 0:
        return jsonify({"success": True}), 200
    else:
        return jsonify({"error": "Report not found"}), 404
    
def convert_objectid(report):
   
    if '_id' in report:
        report['_id'] = str(report['_id'])  # Convert ObjectId to string
    return report
    
def get_unique_report(report_id,request,db):
    report_collection = db["report"]
    try:
        # Convert the string report_id to ObjectId
        print(report_id)
        object_id = ObjectId(report_id)

        # Fetch the report from the database
        report = report_collection.find_one({"_id": object_id})
        report = convert_objectid(report)
        if report:
            return jsonify(report), 200  # Return the report as a JSON response
        else:
            return jsonify({"error": "Report not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_report_comment(report_id,request,db):
    report_collection = db["report"]
    try:
        # Convert the string report_id to ObjectId
        object_id = ObjectId(report_id)

        # Get the updated comment from the request body
        data = request.get_json()
        new_comment = data.get("doctor_comment")

        # Update the doctor_comments field in the database
        result = report_collection.update_one(
            {"_id": object_id},
            {"$set": {"doctor_comment": new_comment}}
        )

        if result.matched_count > 0:
            return jsonify({"success": True, "message": "Comment updated successfully"}), 200
        else:
            return jsonify({"error": "Report not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_model_accuracy(report_id,request,db):
    report_collection = db["report"]
    data = request.get_json()
    object_id = ObjectId(report_id)
    new_accuracy = data.get("model_accuracy")

    if not report_id or not new_accuracy:
        return jsonify({"error": "Missing parameters"}), 400


    result = report_collection.update_one(
        {"_id": object_id},
        {"$set": {"model_accuracy": new_accuracy}}
    )

    if result.matched_count > 0:
        return jsonify({"success": True}), 200
    else:
        return jsonify({"error": "Report not found"}), 404
    
def get_Report_Patient(request,db):
    report_collection = db["report"] 
    try:
        # Get the userId (doctor_id) from the request body
        data = request.get_json()
        patient_id = data.get("userId")

        if not patient_id:
            return jsonify({"error": "Missing userId parameter"}), 400

        # Find all reports with the doctor_id equal to the provided doctor_id
        reports = report_collection.find({"user_id": patient_id})

        # Convert the cursor to a list and use dumps to handle BSON serialization
        reports_list = list(reports)
        reports_json = dumps(reports_list)

        # Return the list of reports as a JSON response
        return jsonify({"reports": reports_json}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500