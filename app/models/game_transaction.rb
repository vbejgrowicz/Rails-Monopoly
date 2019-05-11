class GameTransaction < ApplicationRecord
  validates :turn_action_id, :sender_id, :amount, presence: true
  validates :completed, :canceled, inclusion: { in: [true, false] }
  validates :transaction_type, inclusion: {
    in: [
      'purchase',
      'rent',
      'bank_transaction',
    ]
  }

  belongs_to :turn_action
  belongs_to :deed, optional: true
  belongs_to :sender, class_name: 'Player', primary_key: :id, foreign_key: :sender_id
  belongs_to :receiver, class_name: 'Player', primary_key: :id, foreign_key: :receiver_id, optional: true

  def rent?
    transaction_type == 'rent'
  end

  def bank_transaction?
    transaction_type == 'bank_transaction'
  end
end
