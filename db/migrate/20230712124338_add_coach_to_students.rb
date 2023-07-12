class AddCoachToStudents < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :coach, :string, null: false
    add_index :students, :coach
  end
end
