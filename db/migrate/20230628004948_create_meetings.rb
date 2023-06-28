class CreateMeetings < ActiveRecord::Migration[7.0]
  def change
    create_table :meetings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :category, null: false
      t.string :student, null: false
      t.string :problem
      t.text :notes
      
      t.timestamps
    end
    
    add_index :meetings, :student
    add_index :meetings, :category
  end
end
