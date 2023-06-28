class AddEmailToMeeting < ActiveRecord::Migration[7.0]
  def change
    add_column :meetings, :student_email, :string, null: false
    add_index :meetings, :student_email
  end
end
