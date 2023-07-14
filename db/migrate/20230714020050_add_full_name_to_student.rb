class AddFullNameToStudent < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :full_name, :string, null: false
    add_index :students, :full_name
  end
end
