json.partial! 'meeting', meeting: @meeting
json.extract! @meeting.user, :first_name, :last_name